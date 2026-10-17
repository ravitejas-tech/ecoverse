import { dashboardStatsSchema } from '~/schemas/dashboard-stats'
import { supabase } from '~/services/supabase'

export async function getDashboardStats(eventId: string | null) {
    const { data, error } = await supabase.rpc('dashboard_stats', eventId ? { p_event_id: eventId } : {})
    if (error) throw error
    return dashboardStatsSchema.parse(data)
}
