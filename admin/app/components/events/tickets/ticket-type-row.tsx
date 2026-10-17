import { Pencil, Trash2 } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { InsetCard } from '~/components/ui/inset-card'
import { MoveButtons } from '~/components/ui/move-buttons'
import { ProgressBar } from '~/components/ui/progress-bar'
import { Text } from '~/components/ui/text'
import { TICKET_STATE_TONES, TICKETS_COPY } from '~/data/events/tickets'
import { ticketSaleState } from '~/lib/events/tickets'
import { formatCount, formatDateTime, formatRupees } from '~/lib/format'
import type { TicketTypeStock } from '~/types/ticket-types'

export interface TicketTypeRowProps {
    ticket: TicketTypeStock
    canEdit: boolean
    index: number
    count: number
    onEdit: () => void
    onMove: (from: number, to: number) => void
    onDelete: () => void
}

export function TicketTypeRow({ ticket, canEdit, index, count, onEdit, onMove, onDelete }: TicketTypeRowProps) {
    const state = ticketSaleState(ticket)
    const booked = TICKETS_COPY.booked(formatCount(ticket.booked), formatCount(ticket.quantity))
    const facts = [
        ticket.price > 0 ? formatRupees(ticket.price) : TICKETS_COPY.free,
        booked,
        TICKETS_COPY.left(formatCount(ticket.remaining)),
        ticket.admits > 1 && TICKETS_COPY.admits(ticket.admits),
        TICKETS_COPY.perOrder(ticket.min_per_order, ticket.max_per_order),
        ticket.sales_start && TICKETS_COPY.opensAt(formatDateTime(ticket.sales_start)),
        ticket.sales_end && TICKETS_COPY.closesAt(formatDateTime(ticket.sales_end)),
    ].filter((fact) => typeof fact === 'string')

    return (
        <InsetCard className='space-y-3'>
            <div className='flex flex-wrap items-start justify-between gap-2'>
                <div className='min-w-0 space-y-1'>
                    <Text
                        as='h3'
                        variant='title'>
                        {ticket.name}
                    </Text>
                    {ticket.description && (
                        <Text
                            variant='small'
                            tone='secondary'>
                            {ticket.description}
                        </Text>
                    )}
                </div>
                <Badge tone={TICKET_STATE_TONES[state]}>{TICKETS_COPY.states[state]}</Badge>
            </div>
            <ProgressBar
                value={ticket.booked}
                max={ticket.quantity}
                size='sm'
                label={booked}
            />
            <Text
                variant='small'
                tone='secondary'>
                {facts.join(' · ')}
            </Text>
            {canEdit && (
                <div className='flex flex-wrap gap-2'>
                    <Button
                        variant='secondary'
                        size='sm'
                        onClick={onEdit}>
                        <Pencil />
                        {TICKETS_COPY.edit}
                    </Button>
                    <MoveButtons
                        itemLabel={ticket.name}
                        index={index}
                        count={count}
                        onMove={onMove}
                        size='icon'
                    />
                    {ticket.booked === 0 && (
                        <Button
                            variant='ghost'
                            size='sm'
                            onClick={onDelete}>
                            <Trash2 />
                            {TICKETS_COPY.remove}
                        </Button>
                    )}
                </div>
            )}
        </InsetCard>
    )
}
