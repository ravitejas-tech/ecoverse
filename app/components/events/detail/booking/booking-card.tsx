import { BookButton } from '~/components/events/detail/booking/book-button'
import { HelpActions } from '~/components/events/detail/booking/help-actions'
import { PriceTag } from '~/components/events/price-tag'
import { Perforation } from '~/components/ui/perforation'
import { PopCard } from '~/components/ui/pop-card'
import { Text } from '~/components/ui/text'
import { formatEventDay, formatEventTime } from '~/lib/format'
import type { EventSummary } from '~/types/events'

export interface BookingCardProps {
    event: EventSummary
    preview: boolean
}

export function BookingCard({ event, preview }: BookingCardProps) {
    return (
        <PopCard className='overflow-hidden'>
            <div className='space-y-4 p-6'>
                <Text
                    variant='label'
                    tone='secondary'>
                    {`${formatEventDay(event.startsAt)} · ${formatEventTime(event.startsAt)} · ${event.city}`}
                </Text>
                <PriceTag event={event} />
                <BookButton
                    event={event}
                    preview={preview}
                    className='w-full'
                />
            </div>
            <Perforation />
            <div className='p-6'>
                <HelpActions event={event} />
            </div>
        </PopCard>
    )
}
