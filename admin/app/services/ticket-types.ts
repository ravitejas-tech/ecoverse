import { withStock } from '~/lib/events/tickets'
import { supabase } from '~/services/supabase'
import type { TicketTypeInsert } from '~/types/ticket-types'

export async function listTicketTypes(eventId: string) {
    const [{ data: types, error }, { data: stock, error: stockError }] = await Promise.all([
        supabase.from('ticket_types').select('*').eq('event_id', eventId).order('sort_order').order('created_at'),
        supabase.rpc('ticket_availability', { p_event_ids: [eventId] }),
    ])
    if (error) throw error
    if (stockError) throw stockError
    return withStock(types, stock)
}

export async function saveTicketType({ id, values }: { id?: string; values: TicketTypeInsert }) {
    const query = id
        ? supabase.from('ticket_types').update(values).eq('id', id)
        : supabase.from('ticket_types').insert(values)
    const { error } = await query
    if (error) throw error
}

export async function deleteTicketType(id: string) {
    const { error } = await supabase.from('ticket_types').delete().eq('id', id)
    if (error) throw error
}

export async function reorderTicketTypes(ids: readonly string[]) {
    const results = await Promise.all(
        ids.map((id, sort_order) => supabase.from('ticket_types').update({ sort_order }).eq('id', id)),
    )
    const failed = results.find(({ error }) => error)
    if (failed?.error) throw failed.error
}
