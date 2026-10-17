import { DetailBlock } from '~/components/events/detail/info/detail-block'
import { TicketRow } from '~/components/events/detail/tickets/ticket-row'
import { EVENT_SECTIONS } from '~/data/events/page'
import type { TicketView } from '~/types/events'

export interface TicketListProps {
    tickets: TicketView[]
}

export function TicketList({ tickets }: TicketListProps) {
    return (
        <DetailBlock title={EVENT_SECTIONS.tickets}>
            <ul className='space-y-3'>
                {tickets.map((ticket) => (
                    <TicketRow
                        key={ticket.id}
                        ticket={ticket}
                    />
                ))}
            </ul>
        </DetailBlock>
    )
}
