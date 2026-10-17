import { CoverImage } from '~/components/events/cover-image'
import { EventActions } from '~/components/events/header/event-actions'
import { StatusBadges } from '~/components/events/status-badges'
import { BackLink } from '~/components/ui/back-link'
import { Text } from '~/components/ui/text'
import { EVENTS_COPY, EVENT_HEADER_COPY } from '~/data/events/copy'
import { EVENT_PATHS } from '~/data/events/links'
import { eventWhen } from '~/lib/events/dates'
import type { EventRow } from '~/types/events'

export function EventHeader({ event }: { event: EventRow }) {
    return (
        <header className='mb-6 space-y-4'>
            <BackLink
                to={EVENT_PATHS.list}
                label={EVENT_HEADER_COPY.back}
            />
            <div className='space-y-5'>
                <div className='flex min-w-0 gap-4'>
                    <div className='hidden sm:block'>
                        <CoverImage
                            src={event.cover_url}
                            alt={event.cover_alt}
                            emptyLabel={EVENTS_COPY.noCover}
                            size='thumb'
                        />
                    </div>
                    <div className='min-w-0 space-y-2'>
                        <Text
                            as='h1'
                            variant='display'>
                            {event.title}
                        </Text>
                        <Text
                            variant='small'
                            tone='secondary'>
                            <time dateTime={event.starts_at}>{eventWhen(event)}</time>
                        </Text>
                        <StatusBadges event={event} />
                    </div>
                </div>
                <EventActions event={event} />
            </div>
        </header>
    )
}
