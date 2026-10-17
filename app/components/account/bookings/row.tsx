import { CalendarDays, ChevronRight, MapPin, Ticket } from 'lucide-react'
import { Link } from 'react-router'
import { ResendTicketsButton } from '~/components/account/bookings/resend-button'
import { Chip } from '~/components/ui/chip'
import { IconText } from '~/components/ui/icon-text'
import { PopCard } from '~/components/ui/pop-card'
import { Sticker } from '~/components/ui/sticker'
import { Text } from '~/components/ui/text'
import { BOOKING_ROW_COPY, ORDER_STATUS_LABELS } from '~/data/account/my-tickets'
import { eventWhen, eventWhere } from '~/lib/checkout/event-labels'
import type { BookingGroup, MyBooking } from '~/types/account'
import { ticketPath } from '~/data/navigation'

export interface BookingRowProps {
    booking: MyBooking
    group: BookingGroup
}

export function BookingRow({
    booking: { id, booking_code, access_token, status, events, tickets },
    group,
}: BookingRowProps) {
    const ticketCount = tickets[0]?.count ?? 0

    return (
        <li className='space-y-2'>
            <PopCard
                asChild
                interactive
                className='flex items-center gap-4 p-4 focus-visible:ring-4 focus-visible:ring-pop-cyan focus-visible:outline-none sm:p-5'>
                <Link to={ticketPath(access_token)}>
                    <Chip
                        size='sm'
                        tone={events.tone}
                        tilt='left'
                        className='hidden sm:grid'
                        aria-hidden>
                        <Ticket />
                    </Chip>
                    <div className='min-w-0 flex-1 space-y-1'>
                        <div className='flex flex-wrap items-center gap-2'>
                            <Text
                                as='h3'
                                variant='subtitle'>
                                {events.title}
                            </Text>
                            {status !== 'paid' && <Sticker tone='orange'>{ORDER_STATUS_LABELS[status]}</Sticker>}
                        </div>
                        <IconText icon={CalendarDays}>
                            <time dateTime={events.starts_at}>{eventWhen(events.starts_at)}</time>
                        </IconText>
                        <IconText icon={MapPin}>{eventWhere(events.venue_name, events.city)}</IconText>
                        <Text
                            variant='small'
                            tone='muted'>
                            {`${BOOKING_ROW_COPY.tickets(ticketCount)} · ${booking_code}`}
                        </Text>
                    </div>
                    <ChevronRight
                        className='size-5 shrink-0 text-text-secondary'
                        aria-hidden
                    />
                </Link>
            </PopCard>
            {group === 'upcoming' && <ResendTicketsButton orderId={id} />}
        </li>
    )
}
