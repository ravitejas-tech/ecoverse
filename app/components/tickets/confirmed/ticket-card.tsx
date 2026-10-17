import { Ban } from 'lucide-react'
import { Perforation } from '~/components/ui/perforation'
import { PopCard } from '~/components/ui/pop-card'
import { QrCode } from '~/components/ui/qr-code'
import { Sticker } from '~/components/ui/sticker'
import { Text } from '~/components/ui/text'
import { TicketStrip } from '~/components/ui/ticket-strip'
import { TICKET_CARD_COPY, ticketQrValue } from '~/data/tickets/ticket'
import { eventWhen } from '~/lib/checkout/event-labels'
import type { BookingEvent, BookingTicket } from '~/types/booking'

export interface TicketCardProps {
    ticket: BookingTicket
    event: Pick<BookingEvent, 'title' | 'starts_at' | 'city' | 'tone'>
    position: number
    total: number
}

export function TicketCard({ ticket, event, position, total }: TicketCardProps) {
    const cancelled = ticket.status === 'cancelled'

    return (
        <PopCard
            asChild
            className='flex h-full flex-col overflow-hidden break-inside-avoid'>
            <article aria-label={ticket.code}>
                <TicketStrip tone={event.tone}>
                    <Text
                        as='span'
                        variant='sticker'
                        tone='on-pop'>
                        {TICKET_CARD_COPY.header}
                    </Text>
                    <Text
                        as='span'
                        variant='sticker'
                        tone='on-pop'>
                        {TICKET_CARD_COPY.position(position, total)}
                    </Text>
                </TicketStrip>
                <div className='space-y-3 p-5'>
                    <Text
                        as='h3'
                        variant='title'>
                        {event.title}
                    </Text>
                    <Text
                        variant='label'
                        tone='secondary'>
                        {`${eventWhen(event.starts_at)} · ${event.city}`}
                    </Text>
                    <div className='flex flex-wrap items-center gap-2'>
                        <Sticker
                            tone='lime'
                            tilt='left'>
                            {ticket.ticket_type}
                        </Sticker>
                        {ticket.checked_in_at && <Sticker tone='cyan'>{TICKET_CARD_COPY.checkedIn}</Sticker>}
                        {cancelled && <Sticker tone='orange'>{TICKET_CARD_COPY.cancelled}</Sticker>}
                    </div>
                </div>
                <Perforation />
                <div className='mt-auto flex flex-col items-center gap-3 p-5'>
                    {cancelled ? (
                        <div className='grid aspect-square w-full max-w-56 place-items-center gap-2 rounded-2xl border-2 border-dashed border-border p-6 text-center'>
                            <Ban
                                className='size-10 text-text-muted'
                                aria-hidden
                            />
                            <Text
                                variant='small'
                                tone='muted'>
                                {TICKET_CARD_COPY.cancelledBody}
                            </Text>
                        </div>
                    ) : (
                        <QrCode
                            value={ticketQrValue(ticket.qr_token)}
                            label={TICKET_CARD_COPY.qrLabel(ticket.code)}
                            className='w-full max-w-56'
                        />
                    )}
                    <div className='space-y-1 text-center'>
                        <Text variant='meta'>{TICKET_CARD_COPY.scanHint}</Text>
                        <Text variant='label'>{ticket.code}</Text>
                    </div>
                </div>
            </article>
        </PopCard>
    )
}
