import { Link } from 'react-router'
import { CoverImage } from '~/components/events/cover-image'
import { EventCardActions } from '~/components/events/list/event-card-actions'
import { StatusBadges } from '~/components/events/status-badges'
import { PopCard } from '~/components/ui/pop-card'
import { ProgressBar } from '~/components/ui/progress-bar'
import { Text } from '~/components/ui/text'
import { EVENTS_COPY } from '~/data/events/copy'
import { EVENT_PATHS } from '~/data/events/links'
import { eventWhen } from '~/lib/events/dates'
import { formatCount, formatRupees } from '~/lib/format'
import type { EventOverview } from '~/types/events'

export function EventCard({ event }: { event: EventOverview }) {
    const { stats } = event
    const capacity = stats?.capacity ?? 0
    const sold = capacity - (stats?.remaining ?? 0)

    return (
        <PopCard
            asChild
            padding='md'
            className='flex flex-col gap-4 lg:flex-row lg:items-center'>
            <article>
                <div className='flex min-w-0 flex-1 gap-4'>
                    <CoverImage
                        src={event.cover_url}
                        alt={event.cover_alt}
                        emptyLabel={EVENTS_COPY.noCover}
                        size='thumb'
                    />
                    <div className='min-w-0 flex-1 space-y-2'>
                        <Text
                            as='h2'
                            variant='title'>
                            <Link
                                to={EVENT_PATHS.detail(event.id)}
                                className='underline-offset-4 hover:underline'>
                                {event.title}
                            </Link>
                        </Text>
                        <Text
                            variant='small'
                            tone='secondary'>
                            <time dateTime={event.starts_at}>{eventWhen(event)}</time>
                        </Text>
                        <StatusBadges event={event} />
                    </div>
                </div>
                <div className='space-y-2 lg:w-64'>
                    <ProgressBar
                        value={sold}
                        max={capacity}
                        size='sm'
                        label={EVENTS_COPY.sold(formatCount(sold), formatCount(capacity))}
                    />
                    <Text
                        variant='small'
                        tone='secondary'>
                        {capacity > 0
                            ? EVENTS_COPY.sold(formatCount(sold), formatCount(capacity))
                            : EVENTS_COPY.noTickets}
                        {stats && stats.gross_sales > 0 && ` · ${EVENTS_COPY.money(formatRupees(stats.gross_sales))}`}
                    </Text>
                </div>
                <EventCardActions event={event} />
            </article>
        </PopCard>
    )
}
