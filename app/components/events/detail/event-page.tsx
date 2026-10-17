import { BookingCard } from '~/components/events/detail/booking/booking-card'
import { HelpActions } from '~/components/events/detail/booking/help-actions'
import { MissedItCard } from '~/components/events/detail/booking/missed-it-card'
import { StickyBookBar } from '~/components/events/detail/booking/sticky-book-bar'
import { EventLayout } from '~/components/events/detail/event-layout'
import { EventMain } from '~/components/events/detail/event-main'
import { EventHero } from '~/components/events/detail/header/event-hero'
import { RelatedEvents } from '~/components/events/detail/related-events'
import type { EventPageData } from '~/types/events'

export interface EventPageProps {
    data: EventPageData
}

export function EventPage({ data }: EventPageProps) {
    const { event, preview, related } = data
    const ended = event.status === 'ended'

    return (
        <>
            <EventLayout
                asideOnPhones={ended}
                main={
                    <>
                        <EventHero
                            event={event}
                            preview={preview}
                        />
                        {!ended && (
                            <div className='lg:hidden'>
                                <HelpActions event={event} />
                            </div>
                        )}
                        <EventMain data={data} />
                    </>
                }
                aside={
                    ended ? (
                        <MissedItCard />
                    ) : (
                        <BookingCard
                            event={event}
                            preview={preview}
                        />
                    )
                }
            />
            {related.length > 0 && <RelatedEvents events={related} />}
            {!ended && (
                <StickyBookBar
                    event={event}
                    preview={preview}
                />
            )}
        </>
    )
}
