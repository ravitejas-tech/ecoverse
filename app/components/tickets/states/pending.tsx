import { EmptyState } from '~/components/ui/empty-state'
import { Spinner } from '~/components/ui/spinner'
import { WhatsAppButton } from '~/components/ui/whatsapp-button'
import { BOOKING_HELP_MESSAGE, PENDING_COPY } from '~/data/tickets/page'
import { useCountdown } from '~/hooks/use-countdown'

export interface PendingBookingProps {
    bookingCode: string
    pollUntil: number
}

export function PendingBooking({ bookingCode, pollUntil }: PendingBookingProps) {
    const slow = useCountdown(pollUntil) === 0

    return (
        <div
            role='status'
            aria-live='polite'>
            <EmptyState
                level='h1'
                emoji={slow ? PENDING_COPY.slowEmoji : PENDING_COPY.emoji}
                tone={slow ? 'orange' : 'cyan'}
                title={slow ? PENDING_COPY.slowTitle : PENDING_COPY.title}
                body={slow ? PENDING_COPY.slowBody : PENDING_COPY.body}
                action={
                    slow ? (
                        <WhatsAppButton message={BOOKING_HELP_MESSAGE(bookingCode)} />
                    ) : (
                        <Spinner className='size-8' />
                    )
                }
            />
        </div>
    )
}
