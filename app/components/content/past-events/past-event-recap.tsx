import { Images } from 'lucide-react'
import { AnchorLink } from '~/components/ui/anchor-link'
import { PhotoGrid } from '~/components/ui/photo-grid'
import { PopCard } from '~/components/ui/pop-card'
import { Sticker } from '~/components/ui/sticker'
import { Text } from '~/components/ui/text'
import { PAST_EVENTS_COPY, PAST_GALLERY_LIMIT } from '~/data/content/past-events'
import { sectionTitleId } from '~/data/layout/landmarks'
import { eventPath } from '~/data/navigation'
import { formatFullDate } from '~/lib/format'
import type { PastEventRecap as PastEventRecapContent } from '~/types/events'

export interface PastEventRecapProps {
    recap: PastEventRecapContent
    priority?: boolean
}

export function PastEventRecap({ recap: { event, photos }, priority = false }: PastEventRecapProps) {
    const { slug, title, categoryLabel, startsAt, city, summary, tone, photo } = event
    const titleId = sectionTitleId(slug)

    return (
        <PopCard
            asChild
            flatOnPhone
            className='space-y-5 sm:p-6 lg:p-8'>
            <article aria-labelledby={titleId}>
                <div className='flex flex-wrap items-center gap-3'>
                    <Sticker
                        tone={tone}
                        tilt='left'>
                        {categoryLabel}
                    </Sticker>
                    <Text variant='meta'>
                        <time dateTime={startsAt}>{formatFullDate(startsAt)}</time>
                        {` · ${city}`}
                    </Text>
                </div>
                <div className='space-y-2'>
                    <Text
                        as='h2'
                        id={titleId}
                        variant='heading'>
                        <AnchorLink
                            to={eventPath(slug)}
                            layout='heading'>
                            {title}
                        </AnchorLink>
                    </Text>
                    <Text tone='secondary'>{summary}</Text>
                </div>
                <PhotoGrid
                    photos={photos.length > 0 ? photos.slice(0, PAST_GALLERY_LIMIT) : [photo]}
                    columns='four'
                    priority={priority}
                />
                <AnchorLink
                    to={eventPath(slug)}
                    layout='list'
                    icon={<Images aria-hidden />}
                    className='-ml-1'>
                    {PAST_EVENTS_COPY.recap}
                </AnchorLink>
            </article>
        </PopCard>
    )
}
