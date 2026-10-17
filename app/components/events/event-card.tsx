import { CalendarDays, MapPin } from 'lucide-react'
import { Link } from 'react-router'
import { EventCardFooter } from '~/components/events/event-card-footer'
import { FramedPhoto } from '~/components/ui/framed-photo'
import { IconText } from '~/components/ui/icon-text'
import { PopCard } from '~/components/ui/pop-card'
import { Sticker } from '~/components/ui/sticker'
import { Text } from '~/components/ui/text'
import { STATUS_STICKERS } from '~/data/events/status'
import { eventPath } from '~/data/navigation'
import { withOpeningDay } from '~/lib/events'
import { formatEventDay, formatEventTime } from '~/lib/format'
import type { EventSummary } from '~/types/events'

export interface EventCardProps {
    event: EventSummary
    priority?: boolean
}

export function EventCard({ event, priority = false }: EventCardProps) {
    const { slug, title, categoryLabel, photo, startsAt, city, tag, tone, status, opensAt } = event
    const when = `${formatEventDay(startsAt)} · ${formatEventTime(startsAt)}`
    const sticker =
        status === 'on-sale' || status === 'ended'
            ? { label: tag, tone: 'yellow' as const }
            : { ...STATUS_STICKERS[status], label: withOpeningDay(STATUS_STICKERS[status].label, status, opensAt) }

    return (
        <PopCard
            asChild
            interactive
            className='relative flex h-full flex-col overflow-hidden'>
            <article>
                <div className='relative'>
                    <FramedPhoto
                        photo={photo}
                        tone={tone}
                        shape='banner'
                        priority={priority}
                    />
                    {sticker.label && (
                        <Sticker
                            tone={sticker.tone}
                            tilt='hard-right'
                            className='absolute top-4 right-4'>
                            {sticker.label}
                        </Sticker>
                    )}
                </div>
                <div className='flex flex-1 flex-col gap-3 p-5 sm:p-6'>
                    <Text variant='meta'>{categoryLabel}</Text>
                    <Text
                        as='h3'
                        variant='title'>
                        <Link
                            to={eventPath(slug)}
                            className='after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:ring-4 focus-visible:after:ring-pop-cyan'>
                            {title}
                        </Link>
                    </Text>
                    <div className='space-y-2'>
                        <IconText icon={CalendarDays}>
                            <time dateTime={startsAt}>{when}</time>
                        </IconText>
                        <IconText icon={MapPin}>{city}</IconText>
                    </div>
                </div>
                <EventCardFooter event={event} />
            </article>
        </PopCard>
    )
}
