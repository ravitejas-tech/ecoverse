import { SUMMARY_BLOCK_REASONS } from '~/data/checkout/blocked'
import { toEventSummary } from '~/lib/event-mapping'
import { isBookable, ticketStatus } from '~/lib/events'
import type { TicketOption } from '~/types/checkout'
import type { EventWithTickets, TicketAvailability } from '~/types/events'

export function ticketOptions(event: EventWithTickets, availability: TicketAvailability, now: number): TicketOption[] {
    return event.ticket_types
        .filter(({ visible }) => visible)
        .map((type) => {
            const remaining = availability.get(type.id) ?? 0
            const status = ticketStatus(type, remaining, false, now)
            return { type, status, max: isBookable(status) ? Math.min(type.max_per_order, remaining) : 0 }
        })
}

export function blockedState(event: EventWithTickets, availability: TicketAvailability, now: number) {
    const { status, opensAt } = toEventSummary(event, availability, now)
    const reason = status === 'ended' || !event.sales_paused ? (SUMMARY_BLOCK_REASONS[status] ?? null) : 'paused'
    return { reason, opensAt }
}
