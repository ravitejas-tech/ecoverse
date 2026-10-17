import type { MetaDescriptor } from 'react-router'
import { EVENT_META } from '~/data/events/page'
import { eventPath } from '~/data/navigation'
import { PHOTO_SHAPES, REMOTE_PHOTO } from '~/data/ui/media'
import { formatEventDay } from '~/lib/format'
import { buildEventPageSchema } from '~/lib/seo/event-page-schema'
import { buildPageMeta } from '~/lib/seo/meta'
import { truncate } from '~/lib/text'
import type { EventPageData } from '~/types/events'

export function buildEventMeta({ event, preview }: EventPageData): MetaDescriptor[] {
    const { title, city, venueName, summary, startsAt, photo, slug } = event
    const localImage = !REMOTE_PHOTO.test(photo.src)

    return [
        ...buildPageMeta({
            title: truncate(EVENT_META.title(title, city), EVENT_META.titleLimit),
            description: truncate(
                EVENT_META.description(formatEventDay(startsAt), venueName || city, summary),
                EVENT_META.descriptionLimit,
            ),
            path: eventPath(slug),
            image: {
                path: photo.src,
                alt: photo.alt,
                ...(localImage && { width: PHOTO_SHAPES.cover.width, height: PHOTO_SHAPES.cover.height }),
            },
            ...(preview && { robots: EVENT_META.previewRobots }),
        }),
        { 'script:ld+json': buildEventPageSchema(event) },
    ]
}
