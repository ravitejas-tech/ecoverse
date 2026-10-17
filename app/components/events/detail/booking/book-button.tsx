import { Link } from 'react-router'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { EVENT_CARD_COPY } from '~/data/events/card'
import { BOOKING_COPY } from '~/data/events/page'
import { BOOK_BUTTON_LABELS } from '~/data/events/status'
import { eventBookingPath } from '~/data/navigation'
import { isBookable, withOpeningDay } from '~/lib/events'
import type { EventSummary } from '~/types/events'

export interface BookButtonProps {
    event: EventSummary
    preview: boolean
    className?: string
}

export function BookButton({ event: { slug, title, status, opensAt }, preview, className }: BookButtonProps) {
    if (isBookable(status) && !preview) {
        return (
            <Button
                asChild
                size='lg'
                className={className}>
                <Link to={eventBookingPath(slug)}>
                    {BOOK_BUTTON_LABELS[status]}
                    <Text
                        as='span'
                        variant='inherit'
                        className='sr-only'>
                        {EVENT_CARD_COPY.forEvent(title)}
                    </Text>
                </Link>
            </Button>
        )
    }

    return (
        <Button
            type='button'
            size='lg'
            disabled
            className={className}>
            {preview ? BOOKING_COPY.preview : withOpeningDay(BOOK_BUTTON_LABELS[status], status, opensAt)}
        </Button>
    )
}
