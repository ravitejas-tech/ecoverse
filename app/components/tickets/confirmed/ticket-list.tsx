import { TicketCard, type TicketCardProps } from '~/components/tickets/confirmed/ticket-card'
import { SwipeGrid } from '~/components/ui/swipe-grid'
import { Text } from '~/components/ui/text'
import { CONFIRMED_COPY, TICKET_IDS } from '~/data/tickets/page'
import type { BookingTicket } from '~/types/booking'

export interface TicketListProps {
    tickets: BookingTicket[]
    event: TicketCardProps['event']
}

export function TicketList({ tickets, event }: TicketListProps) {
    const cards = tickets.map((ticket, index) => (
        <TicketCard
            key={ticket.code}
            ticket={ticket}
            event={event}
            position={index + 1}
            total={tickets.length}
        />
    ))

    return (
        <section
            aria-labelledby={TICKET_IDS.tickets}
            className='space-y-4'>
            <div className='space-y-1'>
                <Text
                    as='h2'
                    id={TICKET_IDS.tickets}
                    variant='heading'>
                    {CONFIRMED_COPY.ticketsTitle(tickets.length)}
                </Text>
                <Text
                    variant='small'
                    tone='secondary'>
                    {CONFIRMED_COPY.ticketsHint}
                </Text>
            </div>
            {tickets.length === 1 ? (
                <div className='max-w-sm'>{cards}</div>
            ) : (
                <>
                    <SwipeGrid columns={tickets.length % 4 === 0 ? 'four' : 'three'}>{cards}</SwipeGrid>
                    <Text
                        variant='small'
                        tone='muted'
                        className='-mt-4 sm:hidden'>
                        {CONFIRMED_COPY.swipeHint}
                    </Text>
                </>
            )}
        </section>
    )
}
