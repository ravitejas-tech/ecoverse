import { BookingView } from '~/components/tickets/booking-view'
import { Container } from '~/components/ui/container'
import { useNewBookingCelebration } from '~/hooks/tickets/use-new-booking-celebration'
import { useTicketBooking } from '~/hooks/tickets/use-ticket-booking'

export function TicketScreen({ token }: { token: string }) {
    const query = useTicketBooking(token)
    useNewBookingCelebration(query.booking.data)

    return (
        <Container className='py-8 sm:py-14'>
            <BookingView
                accessToken={token}
                {...query}
            />
        </Container>
    )
}
