import { formatEventDay } from '~/lib/format'
import type { Tables } from '~/types/database'

export function eventOptions(events: readonly Pick<Tables<'events'>, 'id' | 'title' | 'starts_at'>[]) {
    return events.map(({ id, title, starts_at }) => ({ value: id, label: `${title} · ${formatEventDay(starts_at)}` }))
}

export function hasEnded({ ends_at }: Pick<Tables<'events'>, 'ends_at'>, now: number) {
    return new Date(ends_at).getTime() < now
}
