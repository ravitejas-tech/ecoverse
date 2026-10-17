import { EVENT_HEADER_COPY } from '~/data/events/copy'
import type { EventRow } from '~/types/events'
import type { TicketType } from '~/types/ticket-types'

const { blockers } = EVENT_HEADER_COPY

export function publishBlockers(event: EventRow, ticketTypes: readonly TicketType[]) {
    return [
        !ticketTypes.some(({ visible }) => visible) && blockers.noTickets,
        !(event.cover_url && event.cover_alt) && blockers.noCover,
        !event.summary && blockers.noSummary,
        !event.venue_name && blockers.noVenue,
    ].filter((blocker) => typeof blocker === 'string')
}
