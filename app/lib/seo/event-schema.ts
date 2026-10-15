import { eventAnchorId } from '~/data/landing/events'
import { SECTION_IDS, sectionHref } from '~/data/navigation'
import { BRAND_NAME } from '~/data/brand'
import { SCHEMA_CURRENCY, SCHEMA_ENUMS } from '~/data/seo/schema'
import { SITE } from '~/data/seo/site'
import { absoluteUrl } from '~/lib/seo/url'
import type { EventPreview } from '~/types/landing'

export function buildEventSchema({
    slug,
    title,
    description,
    startsAt,
    endsAt,
    city,
    region,
    priceFrom,
    photo,
}: EventPreview) {
    return {
        '@type': 'Event',
        '@id': absoluteUrl(`/#${eventAnchorId(slug)}`),
        url: absoluteUrl(`/#${eventAnchorId(slug)}`),
        name: title,
        description,
        startDate: startsAt,
        endDate: endsAt,
        eventStatus: SCHEMA_ENUMS.scheduled,
        eventAttendanceMode: SCHEMA_ENUMS.offline,
        image: [absoluteUrl(photo.src)],
        location: {
            '@type': 'Place',
            name: city,
            address: {
                '@type': 'PostalAddress',
                addressLocality: city,
                addressRegion: region,
                addressCountry: SITE.country,
            },
        },
        organizer: { '@type': 'Organization', name: BRAND_NAME, url: absoluteUrl('/') },
        offers: {
            '@type': 'Offer',
            price: priceFrom,
            priceCurrency: SCHEMA_CURRENCY,
            availability: SCHEMA_ENUMS.inStock,
            url: absoluteUrl(`/${sectionHref(SECTION_IDS.events)}`),
        },
    }
}
