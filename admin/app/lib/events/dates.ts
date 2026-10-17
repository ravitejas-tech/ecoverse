import { formatEventDay, formatEventTime } from '~/lib/format'
import type { EventRow } from '~/types/events'

export function eventWhen({ starts_at, city }: Pick<EventRow, 'starts_at' | 'city'>) {
    return [formatEventDay(starts_at), formatEventTime(starts_at), city].join(' · ')
}
