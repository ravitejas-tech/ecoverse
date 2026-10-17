import { supabase } from '~/services/supabase'
import type { StaffMember } from '~/types/staff'

let cached: { userId: string; staff: StaffMember | null } | undefined

supabase.auth.onAuthStateChange((_event, session) => {
    if (cached && cached.userId !== session?.user.id) cached = undefined
})

export async function getCurrentStaff(userId: string) {
    if (cached?.userId === userId) return cached.staff
    const { data, error } = await supabase
        .from('staff')
        .select('*')
        .eq('user_id', userId)
        .eq('active', true)
        .maybeSingle()
    if (error) throw error
    cached = { userId, staff: data }
    return data
}
