import { Text } from '~/components/ui/text'
import { EVENT_CARD_COPY } from '~/data/events/card'
import { BOOK_BUTTON_LABELS } from '~/data/events/status'
import { isBookable, withOpeningDay } from '~/lib/events'
import { formatRupees } from '~/lib/format'
import type { EventSummary } from '~/types/events'

export interface PriceTagProps {
    event: Pick<EventSummary, 'status' | 'priceFrom' | 'opensAt'>
}

export function PriceTag({ event: { status, priceFrom, opensAt } }: PriceTagProps) {
    if (isBookable(status) && priceFrom !== null) {
        return (
            <div>
                <Text variant='meta'>{EVENT_CARD_COPY.priceFrom}</Text>
                <Text variant='price'>{formatRupees(priceFrom)}</Text>
            </div>
        )
    }

    return (
        <div>
            <Text variant='meta'>{EVENT_CARD_COPY.tickets}</Text>
            <Text variant='subtitle'>{withOpeningDay(BOOK_BUTTON_LABELS[status], status, opensAt)}</Text>
        </div>
    )
}
