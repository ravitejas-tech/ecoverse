import { RECENT_SCANS_LIMIT } from '~/data/check-in/scanner'
import { checkInResponseSchema } from '~/schemas/check-in'
import { supabase } from '~/services/supabase'
import type { CheckInRequest } from '~/types/check-in'

export async function checkIn({ eventId, value, override = false }: CheckInRequest) {
    const { data, error } = await supabase.rpc('check_in', {
        p_event_id: eventId,
        p_value: value.trim(),
        p_override: override,
    })
    if (error) throw new Error(error.message)
    return checkInResponseSchema.parse(data)
}

export async function getCheckInStats(eventId: string) {
    const { data, error } = await supabase.rpc('check_in_stats', { p_event_id: eventId })
    if (error) throw error
    return data[0] ?? { valid_tickets: 0, checked_in: 0 }
}

export async function listRecentCheckIns(eventId: string) {
    const { data, error } = await supabase
        .from('check_ins')
        .select('id, result, scanned_value, created_at, tickets(code, ticket_types(name))')
        .eq('event_id', eventId)
        .order('created_at', { ascending: false })
        .limit(RECENT_SCANS_LIMIT)
    if (error) throw error
    return data
}

export async function getCheckInEvent(eventId: string) {
    const { data, error } = await supabase
        .from('events')
        .select('id, title, starts_at, ends_at, venue_name, city')
        .eq('id', eventId)
        .maybeSingle()
    if (error) throw error
    return data
}

export async function listCheckInEvents() {
    const [events, summaries] = await Promise.all([
        supabase
            .from('events')
            .select('id, title, starts_at, ends_at, venue_name, city')
            .eq('status', 'published')
            .order('starts_at'),
        supabase.rpc('event_summaries'),
    ])
    if (events.error) throw events.error
    if (summaries.error) throw summaries.error
    const counts = new Map(summaries.data.map((summary) => [summary.event_id, summary]))
    return events.data.map((event) => ({
        ...event,
        tickets: counts.get(event.id)?.tickets_sold ?? 0,
        checkedIn: counts.get(event.id)?.checked_in ?? 0,
    }))
}
