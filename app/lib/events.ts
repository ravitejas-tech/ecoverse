import { EVENT_CATEGORIES } from '~/data/events/categories'
import { MAPS_DIRECTIONS } from '~/data/events/media'
import { BOOKABLE_STATUSES, FEW_LEFT_THRESHOLD } from '~/data/events/status'
import { formatEventDay } from '~/lib/format'
import type {
    BookingStatus,
    EventCategory,
    EventLocation,
    EventWithTickets,
    TicketStatus,
    TicketTypeRow,
} from '~/types/events'

export const hasPassed = (instant: string, now: number) => Date.parse(instant) <= now

export function hasEnded({ ends_at }: Pick<EventWithTickets, 'ends_at'>, now: number) {
    return hasPassed(ends_at, now)
}

export function isBookable(status: BookingStatus) {
    return BOOKABLE_STATUSES.includes(status)
}

export function isEventCategory(value: string | null): value is EventCategory {
    return value !== null && Object.hasOwn(EVENT_CATEGORIES, value)
}

export function withOpeningDay(label: string, status: BookingStatus, opensAt: string | null) {
    return status === 'opens-later' && opensAt ? `${label} ${formatEventDay(opensAt)}` : label
}

export function ticketStatus(
    type: TicketTypeRow,
    remaining: number | undefined,
    paused: boolean,
    now: number,
): TicketStatus {
    if (type.sold_out || (remaining !== undefined && remaining < type.min_per_order)) return 'sold-out'
    if (type.sales_start && !hasPassed(type.sales_start, now)) return 'opens-later'
    if (paused || (type.sales_end && hasPassed(type.sales_end, now))) return 'closed'
    return remaining !== undefined && remaining <= FEW_LEFT_THRESHOLD ? 'few-left' : 'on-sale'
}

export function directionsUrl({ venue_lat, venue_lng, map_url, venue_name, venue_address, city }: EventLocation) {
    const pinned = venue_lat !== null && venue_lng !== null
    if (!pinned && map_url) return map_url
    const destination = pinned
        ? `${venue_lat},${venue_lng}`
        : [venue_name, venue_address, city].filter(Boolean).join(', ')
    return `${MAPS_DIRECTIONS.url}?${new URLSearchParams({ api: MAPS_DIRECTIONS.api, destination })}`
}
