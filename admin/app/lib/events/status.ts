import { EVENT_BADGES } from '~/data/events/copy'
import { hasPassed } from '~/lib/date-input'
import type { EventFilter, EventRow } from '~/types/events'

export function eventFilterOf(event: EventRow): EventFilter {
    if (hasPassed(event.ends_at)) return 'past'
    return event.status === 'published' ? 'upcoming' : 'drafts'
}

export function matchesEventSearch(event: EventRow, search: string) {
    const wanted = search.trim().toLowerCase()
    return !wanted || [event.title, event.city, event.venue_name].some((value) => value.toLowerCase().includes(wanted))
}

export function eventBadges(event: EventRow) {
    const over = hasPassed(event.ends_at)
    return [
        over && { label: EVENT_BADGES.over, tone: 'muted' as const },
        event.status === 'draft' && { label: EVENT_BADGES.draft, tone: 'yellow' as const },
        event.status === 'published' && !over && { label: EVENT_BADGES.published, tone: 'lime' as const },
        event.sales_paused && !over && { label: EVENT_BADGES.paused, tone: 'orange' as const },
    ].filter((badge) => badge !== false)
}
