import { DB_ERROR_CODES, SLUG_RETRIES } from '~/data/ui/db-errors'
import { supabase } from '~/services/supabase'
import { uploadEventImage } from '~/services/storage'
import type { EventInsert, EventOverview, EventUpdate } from '~/types/events'

export async function listEvents() {
    const { data, error } = await supabase.from('events').select('*').order('starts_at', { ascending: false })
    if (error) throw error
    return data
}

export async function listEventOverviews(): Promise<EventOverview[]> {
    const [events, { data: summaries, error }] = await Promise.all([listEvents(), supabase.rpc('event_summaries')])
    if (error) throw error
    return events.map((event) => ({ ...event, stats: summaries.find(({ event_id }) => event_id === event.id) }))
}

export async function getEvent(id: string) {
    const { data, error } = await supabase.from('events').select('*').eq('id', id).maybeSingle()
    if (error) throw error
    return data
}

async function insertEvent(insert: EventInsert, attempt = 0): Promise<string> {
    const slug = attempt === 0 ? insert.slug : `${insert.slug}-${crypto.randomUUID().slice(0, 4)}`
    const { data, error } = await supabase
        .from('events')
        .insert({ ...insert, slug })
        .select('id')
        .single()
    if (error?.code === DB_ERROR_CODES.uniqueViolation && attempt < SLUG_RETRIES)
        return insertEvent(insert, attempt + 1)
    if (error) throw error
    return data.id
}

export async function createEvent(insert: EventInsert, cover?: { file: File; alt: string }) {
    const id = await insertEvent(insert)
    if (!cover) return { id, coverFailed: false }
    try {
        const coverUrl = await uploadEventImage(id, cover.file, 'cover')
        await updateEvent({ id, patch: { cover_url: coverUrl, cover_alt: cover.alt } })
        return { id, coverFailed: false }
    } catch {
        return { id, coverFailed: true }
    }
}

export async function updateEvent({ id, patch }: { id: string; patch: EventUpdate }) {
    const { data, error } = await supabase.from('events').update(patch).eq('id', id).select('*').single()
    if (error) throw error
    return data
}

export async function duplicateEvent(id: string) {
    const { data, error } = await supabase.rpc('duplicate_event', { p_event_id: id })
    if (error) throw error
    return data
}
