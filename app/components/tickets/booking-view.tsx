import { ConfirmedBooking } from '~/components/tickets/confirmed/confirmed'
import { TicketPageSkeleton } from '~/components/tickets/skeleton'
import { ClosedBooking } from '~/components/tickets/states/closed'
import { LoadFailed } from '~/components/tickets/states/load-failed'
import { BookingNotFound } from '~/components/tickets/states/not-found'
import { PendingBooking } from '~/components/tickets/states/pending'
import type { useTicketBooking } from '~/hooks/tickets/use-ticket-booking'
import { bookingState } from '~/lib/tickets/booking-state'

export interface BookingViewProps extends ReturnType<typeof useTicketBooking> {
    accessToken: string
}

export function BookingView({
    accessToken,
    booking: { data, isPending, isError, isRefetching, refetch },
    pollUntil,
}: BookingViewProps) {
    if (isPending) return <TicketPageSkeleton />
    if (isError) {
        return (
            <LoadFailed
                retrying={isRefetching}
                onRetry={() => void refetch()}
            />
        )
    }
    if (!data) return <BookingNotFound />

    const state = bookingState(data.order)
    if (state === 'confirmed') {
        return (
            <ConfirmedBooking
                accessToken={accessToken}
                booking={data}
            />
        )
    }
    if (state === 'pending') {
        return (
            <PendingBooking
                bookingCode={data.order.booking_code}
                pollUntil={pollUntil}
            />
        )
    }
    return (
        <ClosedBooking
            state={state}
            booking={data}
        />
    )
}
