import type { SupabaseClient } from 'npm:@supabase/supabase-js@2'

export type StaffRole = 'super_admin' | 'event_manager' | 'finance' | 'marketing' | 'gate_staff' | 'viewer'

export async function requireStaffRole(userClient: SupabaseClient, roles: StaffRole[]) {
    const { data, error } = await userClient.rpc('has_staff_role', { roles })
    if (error || data !== true) throw new Error('not_allowed')
}
