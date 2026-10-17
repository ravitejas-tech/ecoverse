import { Navigation } from 'lucide-react'
import { BulletList } from '~/components/ui/bullet-list'
import { Button } from '~/components/ui/button'
import { DashedSection } from '~/components/ui/dashed-section'
import { FactRow } from '~/components/ui/fact-row'
import { PopCard } from '~/components/ui/pop-card'
import { Text } from '~/components/ui/text'
import { EVENT_FACTS, EVENT_HEADER_COPY } from '~/data/events/page'
import { CONFIRMED_COPY, TICKET_IDS, timeRange } from '~/data/tickets/page'
import { formatEventTime, formatFullDate } from '~/lib/format'
import { directionsUrl } from '~/lib/events'
import type { BookingEvent } from '~/types/booking'

export function BookingDetails({ event }: { event: BookingEvent }) {
    const { starts_at, ends_at, venue_name, venue_address, city, dress_code, things_to_know } = event

    return (
        <PopCard
            asChild
            className='space-y-5 p-5 sm:p-6'>
            <section aria-labelledby={TICKET_IDS.details}>
                <Text
                    as='h2'
                    id={TICKET_IDS.details}
                    variant='heading'>
                    {CONFIRMED_COPY.detailsTitle}
                </Text>
                <FactRow
                    {...EVENT_FACTS.date}
                    value={formatFullDate(starts_at)}
                />
                <FactRow
                    {...EVENT_FACTS.time}
                    value={timeRange(formatEventTime(starts_at), formatEventTime(ends_at))}
                />
                <FactRow
                    {...EVENT_FACTS.venue}
                    value={venue_name || city}>
                    <Text
                        variant='small'
                        tone='secondary'>
                        {venue_address || city}
                    </Text>
                    <Button
                        asChild
                        variant='secondary'
                        size='sm'
                        className='mt-3 print:hidden'>
                        <a
                            href={directionsUrl(event)}
                            target='_blank'
                            rel='noopener noreferrer'>
                            <Navigation aria-hidden />
                            {EVENT_HEADER_COPY.map}
                            <Text
                                as='span'
                                variant='inherit'
                                className='sr-only'>
                                {EVENT_HEADER_COPY.mapHint}
                            </Text>
                        </a>
                    </Button>
                </FactRow>
                {dress_code && (
                    <FactRow
                        {...EVENT_FACTS.dressCode}
                        value={dress_code}
                    />
                )}
                {things_to_know.length > 0 && (
                    <DashedSection className='space-y-3'>
                        <Text
                            as='h3'
                            variant='subtitle'>
                            {CONFIRMED_COPY.thingsToKnow}
                        </Text>
                        <BulletList
                            items={things_to_know}
                            bullet='info'
                        />
                    </DashedSection>
                )}
            </section>
        </PopCard>
    )
}
