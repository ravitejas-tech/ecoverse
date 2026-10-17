import '@supabase/functions-js/edge-runtime.d.ts'
import { withSupabase } from '@supabase/server'
import { CONFIG } from '../_shared/config.ts'
import { deliverTicketsQuietly } from '../_shared/delivery.ts'
import { isValidPaymentSignature } from '../_shared/razorpay.ts'
import { fail, ok, readJson } from '../_shared/responses.ts'

interface VerifyPaymentRequest {
    orderId: string
    razorpayOrderId?: string
    razorpayPaymentId?: string
    razorpaySignature?: string
}

async function razorpayPaymentId(body: VerifyPaymentRequest, providerOrderId: string | null) {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = body
    if (!providerOrderId || !razorpayPaymentId || !razorpaySignature || razorpayOrderId !== providerOrderId) {
        throw new Error('payment_invalid')
    }
    if (!(await isValidPaymentSignature(providerOrderId, razorpayPaymentId, razorpaySignature))) {
        throw new Error('payment_invalid')
    }
    return razorpayPaymentId
}

export default {
    fetch: withSupabase({ auth: ['user', 'publishable'] }, async (req, { supabaseAdmin }) => {
        try {
            const body = await readJson<VerifyPaymentRequest>(req)
            const { data: order } = await supabaseAdmin
                .from('orders')
                .select('id, status, total, payment_provider, provider_order_id, access_token')
                .eq('id', body.orderId)
                .maybeSingle()
            if (!order) throw new Error('order_not_found')
            if (order.status === 'paid') return ok({ status: 'paid', accessToken: order.access_token })

            const isTestPayment = CONFIG.paymentProvider === 'test' && order.payment_provider === 'test'
            const provider = isTestPayment ? 'test' : 'razorpay'
            const paymentId = isTestPayment ? `test_${order.id}` : await razorpayPaymentId(body, order.provider_order_id)

            const { data: confirmed, error } = await supabaseAdmin.rpc('confirm_order', {
                p_order_id: order.id,
                p_provider: provider,
                p_payment_id: paymentId,
                p_amount_paise: order.total * 100,
            })
            if (error) throw error
            if (confirmed.status === 'paid') await deliverTicketsQuietly(supabaseAdmin, order.id)

            return ok({
                status: confirmed.status === 'paid' ? 'paid' : 'needs_attention',
                accessToken: order.access_token,
            })
        } catch (error) {
            return fail(error)
        }
    }),
}
