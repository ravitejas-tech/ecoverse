import { Link } from 'react-router'
import { PriceTag } from '~/components/events/price-tag'
import { Button } from '~/components/ui/button'
import { Perforation } from '~/components/ui/perforation'
import { Text } from '~/components/ui/text'
import { EVENT_CARD_COPY } from '~/data/events/card'
import { BOOK_BUTTON_LABELS } from '~/data/events/status'
import { eventPath } from '~/data/navigation'
import { isBookable } from '~/lib/events'
import type { EventSummary } from '~/types/events'

export interface EventCardFooterProps {
    event: EventSummary
}

export function EventCardFooter({ event }: EventCardFooterProps) {
    const { slug, title, status } = event
    const bookable = isBookable(status)
    const action = bookable
        ? BOOK_BUTTON_LABELS[status]
        : status === 'ended'
          ? EVENT_CARD_COPY.recap
          : EVENT_CARD_COPY.details

    return (
        <>
            <Perforation />
            <div className='flex items-center justify-between gap-4 p-5 sm:p-6'>
                <PriceTag event={event} />
                <Button
                    asChild
                    size='sm'
                    variant={bookable ? 'primary' : 'secondary'}
                    className='relative z-10'>
                    <Link to={eventPath(slug)}>
                        {action}
                        <Text
                            as='span'
                            variant='inherit'
                            className='sr-only'>
                            {EVENT_CARD_COPY.forEvent(title)}
                        </Text>
                    </Link>
                </Button>
            </div>
        </>
    )
}
