import { Link } from 'react-router'
import { Button } from '~/components/ui/button'
import { ButtonRow } from '~/components/ui/button-row'
import { EmptyState } from '~/components/ui/empty-state'
import { Text } from '~/components/ui/text'
import { WhatsAppButton } from '~/components/ui/whatsapp-button'
import { eventBookingPath } from '~/data/navigation'
import { BOOKING_HELP_MESSAGE, CLOSED_COPY, CLOSED_STATES } from '~/data/tickets/page'
import type { Booking, BookingState } from '~/types/booking'

export interface ClosedBookingProps {
    state: Exclude<BookingState, 'confirmed' | 'pending'>
    booking: Booking
}

export function ClosedBooking({ state, booking: { order, event } }: ClosedBookingProps) {
    const { emoji, tone, title, body, bookAgain } = CLOSED_STATES[state]

    return (
        <EmptyState
            level='h1'
            emoji={emoji}
            tone={tone}
            title={title}
            body={body}
            action={
                <div className='mt-2 flex w-full flex-col items-center gap-4'>
                    <Text
                        variant='label'
                        tone='muted'>
                        {CLOSED_COPY.reference(order.booking_code, event.title)}
                    </Text>
                    <ButtonRow align='center'>
                        {bookAgain && (
                            <Button asChild>
                                <Link to={eventBookingPath(event.slug)}>{CLOSED_COPY.bookAgain}</Link>
                            </Button>
                        )}
                        <WhatsAppButton message={BOOKING_HELP_MESSAGE(order.booking_code)} />
                    </ButtonRow>
                </div>
            }
        />
    )
}
