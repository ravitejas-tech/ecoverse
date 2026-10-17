import '@supabase/functions-js/edge-runtime.d.ts'
import { withSupabase } from '@supabase/server'
import { CONFIG } from '../_shared/config.ts'
import { fail, ok, readJson } from '../_shared/responses.ts'
import { requireStaffRole, type StaffRole } from '../_shared/staff.ts'

const ROLES = new Set<StaffRole>(['super_admin', 'event_manager', 'finance', 'marketing', 'gate_staff', 'viewer'])

interface InviteRequest {
    email: string
    name: string
    role: StaffRole
}

export default {
    fetch: withSupabase({ auth: 'user' }, async (req, { supabase, supabaseAdmin }) => {
        try {
            await requireStaffRole(supabase, ['super_admin'])
            const body = await readJson<InviteRequest>(req)
            const email = body.email?.trim().toLowerCase() ?? ''
            const name = body.name?.trim() ?? ''
            if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error('invalid_email')
            if (name.length < 2 || name.length > 80) throw new Error('invalid_name')
            if (!ROLES.has(body.role)) throw new Error('bad_request')

            const redirectTo = `${CONFIG.adminUrl}/set-password`
            const invited = await supabaseAdmin.auth.admin.inviteUserByEmail(email, { redirectTo, data: { name } })
            let userId = invited.data.user?.id

            if (!userId) {
                const link = await supabaseAdmin.auth.admin.generateLink({ type: 'recovery', email, options: { redirectTo } })
                if (link.error || !link.data.user) throw invited.error ?? link.error
                userId = link.data.user.id
                await supabaseAdmin.auth.resetPasswordForEmail(email, { redirectTo })
            }

            const { error } = await supabase
                .from('staff')
                .upsert({ user_id: userId, name, email, role: body.role, active: true }, { onConflict: 'user_id' })
            if (error) throw error
            return ok({ userId })
        } catch (error) {
            return fail(error)
        }
    }),
}
