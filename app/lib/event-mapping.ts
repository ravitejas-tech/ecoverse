import { EVENT_CATEGORIES } from '~/data/events/categories'
import { FALLBACK_EVENT_PHOTO } from '~/data/events/media'
import { EVENT_STATUS_PRIORITY } from '~/data/events/status'
import { directionsUrl, hasEnded, isBookable, ticketStatus } from '~/lib/events'
import { eventFaqsSchema, eventHostsSchema, eventScheduleSchema } from '~/schemas/event-content'
import type {
    EventDetail,
    EventSummary,
    EventWithTickets,
    GalleryPhotoRow,
    TicketAvailability,
    TicketView,
} from '~/types/events'
import type { Photo } from '~/types/media'

function toTicketViews(row: EventWithTickets, availability: TicketAvailability, now: number): TicketView[] {
    return row.ticket_types
        .filter(({ visible }) => visible)
        .map((type) => ({
            id: type.id,
            name: type.name,
            description: type.description,
            price: type.price,
            admits: type.admits,
            status: ticketStatus(type, availability.get(type.id), row.sales_paused, now),
            opensAt: type.sales_start,
        }))
}

function eventPhoto({ cover_url, cover_alt, cover_credit, cover_source, title }: EventWithTickets): Photo {
    if (!cover_url) return FALLBACK_EVENT_PHOTO
    return {
        src: cover_url,
        alt: cover_alt || title,
        credit: cover_credit ?? undefined,
        source: cover_source ?? undefined,
    }
}

function summarize(row: EventWithTickets, tickets: TicketView[], now: number): EventSummary {
    const onSale = tickets.filter(({ status }) => isBookable(status))
    const opening = tickets
        .filter(({ status, opensAt }) => status === 'opens-later' && opensAt)
        .map(({ opensAt }) => opensAt ?? '')
        .sort((a, b) => Date.parse(a) - Date.parse(b))
    const ticketStatuses = tickets.map(({ status }) => status)

    return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        category: row.category,
        categoryLabel: EVENT_CATEGORIES[row.category].label,
        tag: row.tag,
        tone: row.tone,
        summary: row.summary,
        photo: eventPhoto(row),
        startsAt: row.starts_at,
        endsAt: row.ends_at,
        city: row.city,
        region: row.region,
        venueName: row.venue_name,
        venueAddress: row.venue_address,
        geo:
            row.venue_lat !== null && row.venue_lng !== null
                ? { latitude: row.venue_lat, longitude: row.venue_lng }
                : null,
        priceFrom: onSale.length > 0 ? Math.min(...onSale.map(({ price }) => price)) : null,
        status: hasEnded(row, now)
            ? 'ended'
            : (EVENT_STATUS_PRIORITY.find((status) => ticketStatuses.includes(status)) ?? 'closed'),
        opensAt: opening[0] ?? null,
        updatedAt: row.updated_at,
    }
}

export function toEventSummary(row: EventWithTickets, availability: TicketAvailability, now: number) {
    return summarize(row, toTicketViews(row, availability, now), now)
}

export function toEventDetail(row: EventWithTickets, availability: TicketAvailability, now: number): EventDetail {
    const tickets = toTicketViews(row, availability, now)
    const about = row.description
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)

    return {
        ...summarize(row, tickets, now),
        about: about.length > 0 ? about : [row.summary],
        highlights: row.highlights,
        schedule: eventScheduleSchema.parse(row.schedule),
        hosts: eventHostsSchema.parse(row.hosts),
        faqs: eventFaqsSchema.parse(row.faqs),
        ageLimit: row.age_limit,
        language: row.language,
        dressCode: row.dress_code,
        included: row.included,
        notIncluded: row.not_included,
        thingsToKnow: row.things_to_know,
        terms: row.terms,
        refundPolicy: row.refund_policy,
        mapUrl: directionsUrl(row),
        tickets,
    }
}

export function toGalleryPhoto({ url, alt }: GalleryPhotoRow): Photo {
    return { src: url, alt }
}
