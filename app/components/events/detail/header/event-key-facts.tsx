import { Navigation } from 'lucide-react'
import { AnchorLink } from '~/components/ui/anchor-link'
import { FactRow } from '~/components/ui/fact-row'
import { PopCard } from '~/components/ui/pop-card'
import { Text } from '~/components/ui/text'
import { EVENT_FACTS, EVENT_HEADER_COPY } from '~/data/events/page'
import { formatEventTime, formatFullDate } from '~/lib/format'
import type { EventDetail } from '~/types/events'

export interface EventKeyFactsProps {
    event: EventDetail
}

export function EventKeyFacts({ event }: EventKeyFactsProps) {
    const { startsAt, endsAt, venueName, venueAddress, city, mapUrl } = event

    return (
        <PopCard className='grid gap-5 p-5 sm:grid-cols-2 sm:p-6'>
            <FactRow
                {...EVENT_FACTS.date}
                value={formatFullDate(startsAt)}
            />
            <FactRow
                {...EVENT_FACTS.time}
                value={`${formatEventTime(startsAt)} – ${formatEventTime(endsAt)}`}
            />
            <div className='sm:col-span-2'>
                <FactRow
                    {...EVENT_FACTS.venue}
                    value={venueName || city}>
                    <Text
                        variant='small'
                        tone='secondary'>
                        {venueAddress}
                    </Text>
                    <AnchorLink
                        to={mapUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        layout='list'
                        icon={<Navigation aria-hidden />}
                        className='-ml-1'>
                        {EVENT_HEADER_COPY.map}
                    </AnchorLink>
                </FactRow>
            </div>
        </PopCard>
    )
}
