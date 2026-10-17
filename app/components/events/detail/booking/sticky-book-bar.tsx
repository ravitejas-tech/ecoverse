import { BookButton } from '~/components/events/detail/booking/book-button'
import { PriceTag } from '~/components/events/price-tag'
import { Container } from '~/components/ui/container'
import type { EventSummary } from '~/types/events'

export interface StickyBookBarProps {
    event: EventSummary
    preview: boolean
}

export function StickyBookBar({ event, preview }: StickyBookBarProps) {
    return (
        <div className='sticky bottom-0 z-30 border-t-2 border-border bg-surface pb-safe lg:hidden'>
            <Container className='flex items-center justify-between gap-4 pt-3'>
                <PriceTag event={event} />
                <BookButton
                    event={event}
                    preview={preview}
                    className='min-w-40'
                />
            </Container>
        </div>
    )
}
