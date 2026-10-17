import '@supabase/functions-js/edge-runtime.d.ts'
import { withSupabase } from '@supabase/server'
import { CONFIG } from '../_shared/config.ts'
import { deliverTicketsQuietly } from '../_shared/delivery.ts'
import { createRazorpayOrder } from '../_shared/razorpay.ts'
import { fail, ok, readJson } from '../_shared/responses.ts'

interface CreateOrderRequest {
    eventId: string
    items: { ticketTypeId: string; quantity: number }[]
    buyer: { name: string; email: string; phone: string }
    answers?: Record<string, string>
    promoCode?: string
    marketingConsent?: boolean
    termsAccepted: boolean
    utm?: { source?: string; medium?: string; campaign?: string; referrer?: string }
}

export default {
    fetch: withSupabase({ auth: ['user', 'publishable'] }, async (req, { supabaseAdmin }) => {
        try {
            const body = await readJson<CreateOrderRequest>(req)
            if (body.termsAccepted !== true || !Array.isArray(body.items) || !body.buyer) throw new Error('bad_request')

            const { data: order, error } = await supabaseAdmin.rpc('reserve_order', {
                p_event_id: body.eventId,
                p_items: body.items.map(({ ticketTypeId, quantity }) => ({ ticket_type_id: ticketTypeId, quantity })),
                p_name: body.buyer.name,
                p_email: body.buyer.email,
                p_phone: body.buyer.phone,
                p_answers: body.answers ?? {},
                p_promo_code: body.promoCode?.trim() || null,
                p_marketing_consent: body.marketingConsent === true,
                p_utm: body.utm ?? {},
                p_hold_minutes: CONFIG.holdMinutes,
            })
            if (error) throw error

            const summary = {
                id: order.id,
                bookingCode: order.booking_code,
                accessToken: order.access_token,
                subtotal: order.subtotal,
                discount: order.discount,
                total: order.total,
                holdExpiresAt: order.hold_expires_at,
            }

            if (order.total === 0) {
                const { error: confirmError } = await supabaseAdmin.rpc('confirm_order', {
                    p_order_id: order.id,
                    p_provider: 'free',
                    p_payment_id: null,
                    p_amount_paise: 0,
                })
                if (confirmError) throw confirmError
                await deliverTicketsQuietly(supabaseAdmin, order.id)
                return ok({ order: summary, payment: { provider: 'free' } })
            }

            if (CONFIG.paymentProvider === 'test') {
                await supabaseAdmin.from('orders').update({ payment_provider: 'test' }).eq('id', order.id)
                return ok({ order: summary, payment: { provider: 'test' } })
            }

            try {
                const razorpayOrder = await createRazorpayOrder(order.total * 100, order.booking_code, order.id)
                await supabaseAdmin
                    .from('orders')
                    .update({ payment_provider: 'razorpay', provider_order_id: razorpayOrder.id })
                    .eq('id', order.id)
                return ok({
                    order: summary,
                    payment: {
                        provider: 'razorpay',
                        keyId: CONFIG.razorpay.keyId,
                        providerOrderId: razorpayOrder.id,
                        amount: razorpayOrder.amount,
                        currency: 'INR',
                    },
                })
            } catch (paymentError) {
                await supabaseAdmin.from('orders').update({ status: 'failed', hold_expires_at: null }).eq('id', order.id)
                throw paymentError
            }
        } catch (error) {
            return fail(error)
        }
    }),
}
