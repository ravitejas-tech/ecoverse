import '@supabase/functions-js/edge-runtime.d.ts'
import { withSupabase } from '@supabase/server'
import { deliverRefundNotice } from '../_shared/delivery.ts'
import { refundRazorpayPayment } from '../_shared/razorpay.ts'
import { fail, ok, readJson } from '../_shared/responses.ts'
import { requireStaffRole } from '../_shared/staff.ts'

interface RefundRequest {
    orderId: string
    amount?: number
    reason?: string
}

export default {
    fetch: withSupabase({ auth: 'user' }, async (req, { supabase, supabaseAdmin, userClaims }) => {
        try {
            await requireStaffRole(supabase, ['super_admin', 'finance'])
            const { orderId, amount, reason = '' } = await readJson<RefundRequest>(req)

            const { data: order } = await supabaseAdmin
                .from('orders')
                .select('id, status, total, needs_refund, payment_provider, provider_payment_id')
                .eq('id', orderId)
                .maybeSingle()
            if (!order) throw new Error('order_not_found')
            if (!(['paid', 'cancelled'].includes(order.status) || order.needs_refund)) {
                throw new Error('order_not_refundable')
            }

            const refundAmount = Math.round(amount ?? order.total)
            if (refundAmount < 0 || refundAmount > order.total) throw new Error('bad_request')

            const refundId =
                order.payment_provider === 'razorpay' && order.provider_payment_id && refundAmount > 0
                    ? (await refundRazorpayPayment(order.provider_payment_id, refundAmount * 100, reason || 'Refund')).id
                    : null

            const { data: refunded, error } = await supabaseAdmin.rpc('mark_order_refunded', {
                p_order_id: order.id,
                p_amount: refundAmount,
                p_refund_id: refundId,
                p_actor_id: userClaims?.id ?? null,
                p_actor_email: userClaims?.email ?? null,
                p_reason: reason,
            })
            if (error) throw error
            if (refundAmount > 0) await deliverRefundNotice(supabaseAdmin, order.id, refundAmount)
            return ok({ order: refunded })
        } catch (error) {
            return fail(error)
        }
    }),
}
