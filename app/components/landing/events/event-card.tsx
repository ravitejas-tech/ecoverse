import { CalendarDays, MapPin } from 'lucide-react'
import { CelebrateButton } from '~/components/landing/celebrate-button'
import { FramedPhoto } from '~/components/ui/framed-photo'
import { Perforation } from '~/components/ui/perforation'
import { PopCard } from '~/components/ui/pop-card'
import { Sticker } from '~/components/ui/sticker'
import { Text } from '~/components/ui/text'
import { EVENT_BOOK_LABEL, EVENT_PRICE_PREFIX } from '~/data/landing/events'
import { formatEventDay, formatEventTime, formatRupees } from '~/lib/format'
import { eventAnchorId } from '~/data/landing/events'
import type { EventPreview } from '~/types/landing'

export interface EventCardProps {
    event: EventPreview
}

export function EventCard({
    event: { slug, title, category, photo, startsAt, city, priceFrom, tag, tone },
}: EventCardProps) {
    const when = `${formatEventDay(startsAt)} · ${formatEventTime(startsAt)}`

    return (
        <PopCard
            asChild
            interactive
            className='flex h-full flex-col overflow-hidden'>
            <article id={eventAnchorId(slug)}>
                <div className='relative'>
                    <FramedPhoto
                        photo={photo}
                        tone={tone}
                        shape='banner'
                    />
                    <Sticker
                        tone='yellow'
                        tilt='hard-right'
                        className='absolute top-4 right-4'>
                        {tag}
                    </Sticker>
                </div>
                <div className='flex flex-1 flex-col gap-4 p-6'>
                    <Text variant='meta'>{category}</Text>
                    <Text
                        as='h3'
                        variant='title'>
                        {title}
                    </Text>
                    <div className='space-y-2'>
                        <Text
                            variant='small'
                            tone='secondary'
                            className='flex items-center gap-2'>
                            <CalendarDays className='size-4' />
                            <time dateTime={startsAt}>{when}</time>
                        </Text>
                        <Text
                            variant='small'
                            tone='secondary'
                            className='flex items-center gap-2'>
                            <MapPin className='size-4' />
                            {city}
                        </Text>
                    </div>
                </div>
                <Perforation />
                <div className='flex items-center justify-between gap-4 p-6'>
                    <div>
                        <Text variant='meta'>{EVENT_PRICE_PREFIX}</Text>
                        <Text variant='price'>{formatRupees(priceFrom)}</Text>
                    </div>
                    {/* TODO: link to the event page once ticketing ships */}
                    <CelebrateButton
                        size='sm'
                        aria-label={`${EVENT_BOOK_LABEL}: ${title}`}>
                        {EVENT_BOOK_LABEL}
                    </CelebrateButton>
                </div>
            </article>
        </PopCard>
    )
}
