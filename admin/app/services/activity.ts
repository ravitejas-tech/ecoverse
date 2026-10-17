import { ACTIVITY_FILTER_ENTITIES, ACTIVITY_PAGE_SIZE } from '~/data/activity/filters'
import { nameKey } from '~/lib/activity'
import { supabase } from '~/services/supabase'
import type { ActivityEntry, ActivityFilter } from '~/types/activity'

function idsFor(entries: ActivityEntry[], entity: string) {
    return [
        ...new Set(entries.flatMap((entry) => (entry.entity === entity && entry.entity_id ? [entry.entity_id] : []))),
    ]
}

async function lookupNames(entries: ActivityEntry[]) {
    const [events, types, promos, staff, orders] = await Promise.all([
        supabase.from('events').select('id, title').in('id', idsFor(entries, 'events')),
        supabase.from('ticket_types').select('id, name').in('id', idsFor(entries, 'ticket_types')),
        supabase.from('promo_codes').select('id, code').in('id', idsFor(entries, 'promo_codes')),
        supabase.from('staff').select('user_id, name').in('user_id', idsFor(entries, 'staff')),
        supabase.from('orders').select('id, booking_code').in('id', idsFor(entries, 'orders')),
    ])
    return new Map([
        ...(events.data ?? []).map(({ id, title }) => [nameKey('events', id), title] as const),
        ...(types.data ?? []).map(({ id, name }) => [nameKey('ticket_types', id), name] as const),
        ...(promos.data ?? []).map(({ id, code }) => [nameKey('promo_codes', id), code] as const),
        ...(staff.data ?? []).map(({ user_id, name }) => [nameKey('staff', user_id), name] as const),
        ...(orders.data ?? []).map(({ id, booking_code }) => [nameKey('orders', id), booking_code] as const),
    ])
}

export async function listActivity(filter: ActivityFilter, page: number) {
    const from = page * ACTIVITY_PAGE_SIZE
    let query = supabase
        .from('activity_log')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .order('id', { ascending: false })
        .range(from, from + ACTIVITY_PAGE_SIZE - 1)
    const entity = ACTIVITY_FILTER_ENTITIES[filter]
    if (entity) query = query.eq('entity', entity)
    const { data, error, count } = await query
    if (error) throw error
    return { entries: data, names: await lookupNames(data), count: count ?? 0 }
}
