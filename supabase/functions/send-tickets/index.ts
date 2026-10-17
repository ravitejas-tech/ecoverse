import '@supabase/functions-js/edge-runtime.d.ts'
import { withSupabase } from '@supabase/server'
import { deliverTickets } from '../_shared/delivery.ts'
import { fail, ok, readJson } from '../_shared/responses.ts'

export default {
    fetch: withSupabase({ auth: 'user' }, async (req, { supabase, supabaseAdmin, userClaims }) => {
        try {
            const { orderId } = await readJson<{ orderId: string }>(req)
            const { data: isStaff } = await supabase.rpc('has_staff_role', {
                roles: ['super_admin', 'event_manager', 'finance'],
            })
            if (isStaff !== true) {
                const { data: order } = await supabaseAdmin.from('orders').select('email').eq('id', orderId).maybeSingle()
                if (!order || order.email !== userClaims?.email?.toLowerCase()) throw new Error('not_allowed')
            }
            if (!(await deliverTickets(supabaseAdmin, orderId))) throw new Error('order_not_found')
            return ok({ sent: true })
        } catch (error) {
            return fail(error)
        }
    }),
}
