import { TicketActions } from '~/components/tickets/confirmed/actions'
import { BookingDetails } from '~/components/tickets/confirmed/details'
import { BookingHero } from '~/components/tickets/confirmed/hero'
import { TicketList } from '~/components/tickets/confirmed/ticket-list'
import { WhatsAppButton } from '~/components/ui/whatsapp-button'
import { BOOKING_HELP_MESSAGE } from '~/data/tickets/page'
import type { Booking } from '~/types/booking'

export interface ConfirmedBookingProps {
    accessToken: string
    booking: Booking
}

export function ConfirmedBooking({ accessToken, booking }: ConfirmedBookingProps) {
    const { order, event, tickets } = booking

    return (
        <div className='space-y-10 sm:space-y-14'>
            <BookingHero
                bookingCode={order.booking_code}
                email={order.email}
            />
            <TicketList
                tickets={tickets}
                event={event}
            />
            <TicketActions
                accessToken={accessToken}
                booking={booking}
            />
            <div className='max-w-2xl space-y-6'>
                <BookingDetails event={event} />
                <WhatsAppButton message={BOOKING_HELP_MESSAGE(order.booking_code)} />
            </div>
        </div>
    )
}
