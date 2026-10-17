import { BRAND_NAME } from '~/data/brand'
import { eventPath, PATHS } from '~/data/navigation'
import { OFFER_AVAILABILITY, SCHEMA_CURRENCY, SCHEMA_ENUMS, SCHEMA_IDS } from '~/data/seo/schema'
import { SITE } from '~/data/seo/site'
import { absoluteUrl } from '~/lib/seo/url'
import type { EventSummary, TicketStatus, TicketView } from '~/types/events'

function buildOffer(url: string, price: number, status: TicketStatus, name?: string) {
    return {
        '@type': 'Offer',
        ...(name && { name }),
        price,
        priceCurrency: SCHEMA_CURRENCY,
        availability: OFFER_AVAILABILITY[status],
        url,
    }
}

function buildOffers(url: string, event: EventSummary, tickets?: TicketView[]) {
    if (tickets) {
        return tickets
            .filter(({ status }) => OFFER_AVAILABILITY[status])
            .map(({ price, status, name }) => buildOffer(url, price, status, name))
    }
    return event.priceFrom === null || event.status === 'ended'
        ? []
        : [buildOffer(url, event.priceFrom, event.status === 'few-left' ? 'few-left' : 'on-sale')]
}

export function buildEventSchema(event: EventSummary, tickets?: TicketView[]) {
    const url = absoluteUrl(eventPath(event.slug))
    const offers = buildOffers(url, event, tickets)

    return {
        '@type': 'Event',
        '@id': `${url}${SCHEMA_IDS.event}`,
        url,
        name: event.title,
        description: event.summary,
        startDate: event.startsAt,
        endDate: event.endsAt,
        eventStatus: SCHEMA_ENUMS.scheduled,
        eventAttendanceMode: SCHEMA_ENUMS.offline,
        image: [absoluteUrl(event.photo.src)],
        location: {
            '@type': 'Place',
            name: event.venueName || event.city,
            address: {
                '@type': 'PostalAddress',
                streetAddress: event.venueAddress,
                addressLocality: event.city,
                addressRegion: event.region,
                addressCountry: SITE.country,
            },
            ...(event.geo && { geo: { '@type': 'GeoCoordinates', ...event.geo } }),
        },
        organizer: {
            '@type': 'Organization',
            '@id': absoluteUrl(SCHEMA_IDS.organization),
            name: BRAND_NAME,
            url: absoluteUrl(PATHS.home),
        },
        ...(offers.length > 0 && { offers }),
    }
}
