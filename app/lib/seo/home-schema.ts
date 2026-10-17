import { BRAND_NAME, BRAND_TAGLINE } from '~/data/brand'
import { INSTAGRAM } from '~/data/contact'
import { SCHEMA_CONTEXT, SCHEMA_IDS } from '~/data/seo/schema'
import { BRAND_ICONS, SITE, SOCIAL_IMAGE } from '~/data/seo/site'
import { buildEventSchema } from '~/lib/seo/event-schema'
import { absoluteUrl } from '~/lib/seo/url'
import type { PageMeta } from '~/lib/seo/meta'
import type { EventSummary } from '~/types/events'

export function buildHomeSchema({ title, description, path }: PageMeta, events: EventSummary[]) {
    const organization = { '@id': absoluteUrl(SCHEMA_IDS.organization) }
    const website = { '@id': absoluteUrl(SCHEMA_IDS.website) }
    const logo = BRAND_ICONS.large

    return {
        '@context': SCHEMA_CONTEXT,
        '@graph': [
            {
                '@type': 'Organization',
                ...organization,
                name: BRAND_NAME,
                url: absoluteUrl('/'),
                slogan: BRAND_TAGLINE,
                areaServed: SITE.country,
                sameAs: [INSTAGRAM.url],
                logo: { '@type': 'ImageObject', url: absoluteUrl(logo.path), width: logo.size, height: logo.size },
            },
            {
                '@type': 'WebSite',
                ...website,
                url: absoluteUrl('/'),
                name: BRAND_NAME,
                inLanguage: SITE.language,
                publisher: organization,
            },
            {
                '@type': 'WebPage',
                '@id': absoluteUrl(SCHEMA_IDS.webpage),
                url: absoluteUrl(path),
                name: title,
                description,
                inLanguage: SITE.language,
                isPartOf: website,
                about: organization,
                primaryImageOfPage: absoluteUrl(SOCIAL_IMAGE.path),
            },
            ...events.map((event) => buildEventSchema(event)),
        ],
    }
}
