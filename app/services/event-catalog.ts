import {
    getEventPreview,
    getPublishedEvent,
    getTicketAvailability,
    listGalleryPhotos,
    listPublishedEvents,
} from '~/services/events'
import { RELATED_EVENTS_LIMIT } from '~/data/events/page'
import { toEventDetail, toEventSummary, toGalleryPhoto } from '~/lib/event-mapping'
import { hasEnded } from '~/lib/events'
import { previewTokenSchema } from '~/schemas/event-content'
import type { EventPageData, PastEventRecap } from '~/types/events'

export async function loadEventSummaries(now = Date.now()) {
    const rows = await listPublishedEvents()
    const availability = await getTicketAvailability(rows.filter((row) => !hasEnded(row, now)).map(({ id }) => id))
    return rows.map((row) => toEventSummary(row, availability, now))
}

export async function loadUpcomingEvents(now = Date.now()) {
    return (await loadEventSummaries(now)).filter(({ status }) => status !== 'ended')
}

export async function loadEventPage(slug: string, previewToken: string | null, now = Date.now()) {
    if (previewToken !== null && !previewTokenSchema.safeParse(previewToken).success) return null
    const row = previewToken ? await getEventPreview(slug, previewToken) : await getPublishedEvent(slug)
    if (!row) return null

    const ended = hasEnded(row, now)
    const [availability, gallery, upcoming] = await Promise.all([
        ended || previewToken ? new Map<string, number>() : getTicketAvailability([row.id]),
        ended ? listGalleryPhotos([row.id]) : [],
        loadUpcomingEvents(now),
    ])

    return {
        event: toEventDetail(row, availability, now),
        gallery: gallery.map(toGalleryPhoto),
        related: upcoming.filter((event) => event.slug !== slug).slice(0, RELATED_EVENTS_LIMIT),
        preview: Boolean(previewToken),
    } satisfies EventPageData
}

export async function loadPastEvents(now = Date.now()): Promise<PastEventRecap[]> {
    const past = (await loadEventSummaries(now)).filter(({ status }) => status === 'ended').reverse()
    const photos = past.length > 0 ? await listGalleryPhotos(past.map(({ id }) => id)) : []
    return past.map((event) => ({
        event,
        photos: photos.filter(({ event_id }) => event_id === event.id).map(toGalleryPhoto),
    }))
}
