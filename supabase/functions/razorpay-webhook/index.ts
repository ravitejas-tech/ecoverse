import '@supabase/functions-js/edge-runtime.d.ts'
import { withSupabase } from '@supabase/server'
import { deliverTicketsQuietly } from '../_shared/delivery.ts'
import { isValidWebhookSignature } from '../_shared/razorpay.ts'
import { ok } from '../_shared/responses.ts'

const PAID_EVENTS = new Set(['payment.captured', 'order.paid'])

interface RazorpayWebhook {
    event: string
    payload?: { payment?: { entity?: { id: string; order_id: string; amount: number } } }
}

export default {
    fetch: withSupabase({ auth: 'none', cors: 'disabled' }, async (req, { supabaseAdmin }) => {
        const rawBody = await req.text()
        const signature = req.headers.get('x-razorpay-signature') ?? ''
        if (!(await isValidWebhookSignature(rawBody, signature))) {
            return new Response('Invalid signature', { status: 401 })
        }

        const webhook = JSON.parse(rawBody) as RazorpayWebhook
        const payment = webhook.payload?.payment?.entity
        if (!PAID_EVENTS.has(webhook.event) || !payment?.order_id) return ok({ ignored: true })

        const { data: order } = await supabaseAdmin
            .from('orders')
            .select('id, status')
            .eq('provider_order_id', payment.order_id)
            .maybeSingle()
        if (!order) return ok({ ignored: true })
        if (order.status === 'paid') return ok({ received: true })

        const { data: confirmed, error } = await supabaseAdmin.rpc('confirm_order', {
            p_order_id: order.id,
            p_provider: 'razorpay',
            p_payment_id: payment.id,
            p_amount_paise: payment.amount,
        })
        if (error) {
            console.error('Webhook confirmation failed', order.id, error)
            return new Response('Confirmation failed', { status: 500 })
        }
        if (confirmed.status === 'paid') await deliverTicketsQuietly(supabaseAdmin, order.id)
        return ok({ received: true })
    }),
}
