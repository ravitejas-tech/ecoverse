import { invokeFunction } from '~/services/functions'
import { supabase } from '~/services/supabase'
import type { InviteValues } from '~/schemas/team'
import type { StaffChanges } from '~/types/team'

export async function listTeam() {
    const { data, error } = await supabase.from('staff').select('*').order('active', { ascending: false }).order('name')
    if (error) throw error
    return data
}

export async function inviteStaff(invite: InviteValues) {
    return invokeFunction<{ userId: string }>('invite-staff', { ...invite, email: invite.email.trim().toLowerCase() })
}

export async function updateStaff({ userId, changes }: StaffChanges) {
    const { error } = await supabase.from('staff').update(changes).eq('user_id', userId)
    if (error) throw error
}
