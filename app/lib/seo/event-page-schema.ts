import { BREADCRUMB_LABELS } from '~/data/events/page'
import { eventPath, PATHS } from '~/data/navigation'
import { SCHEMA_CONTEXT } from '~/data/seo/schema'
import { buildEventSchema } from '~/lib/seo/event-schema'
import { absoluteUrl } from '~/lib/seo/url'
import type { EventDetail } from '~/types/events'

export function buildEventPageSchema(event: EventDetail) {
    const crumbs = [
        { name: BREADCRUMB_LABELS.home, path: PATHS.home },
        { name: BREADCRUMB_LABELS.events, path: PATHS.events },
        { name: event.title, path: eventPath(event.slug) },
    ]

    return {
        '@context': SCHEMA_CONTEXT,
        '@graph': [
            buildEventSchema(event, event.tickets),
            {
                '@type': 'BreadcrumbList',
                itemListElement: crumbs.map(({ name, path }, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    name,
                    item: absoluteUrl(path),
                })),
            },
        ],
    }
}
