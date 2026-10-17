import type { z } from 'zod'
import type { PopTone } from '~/data/ui/pop-tones'
import type { eventFaqSchema, eventHostSchema, eventScheduleItemSchema } from '~/schemas/event-content'
import type { Enums, Tables } from '~/types/database'
import type { Photo } from '~/types/media'

export type EventCategory = Enums<'event_category'>

export type TicketTypeRow = Tables<'ticket_types'>

export type EventWithTickets = Tables<'events'> & { ticket_types: TicketTypeRow[] }

export type GalleryPhotoRow = Tables<'gallery_photos'>

export type TicketAvailability = Map<string, number>

export type EventLocation = Pick<
    Tables<'events'>,
    'map_url' | 'venue_name' | 'venue_address' | 'city' | 'venue_lat' | 'venue_lng'
>

export interface GeoPoint {
    latitude: number
    longitude: number
}

export type ScheduleItem = z.infer<typeof eventScheduleItemSchema>

export type EventHost = z.infer<typeof eventHostSchema>

export type EventFaq = z.infer<typeof eventFaqSchema>

export type TicketStatus = 'on-sale' | 'few-left' | 'sold-out' | 'opens-later' | 'closed'

export type BookingStatus = TicketStatus | 'ended'

export interface TicketView extends Pick<TicketTypeRow, 'id' | 'name' | 'description' | 'price' | 'admits'> {
    status: TicketStatus
    opensAt: string | null
}

export interface EventSummary {
    id: string
    slug: string
    title: string
    category: EventCategory
    categoryLabel: string
    tag: string
    tone: PopTone
    summary: string
    photo: Photo
    startsAt: string
    endsAt: string
    city: string
    region: string
    venueName: string
    venueAddress: string
    geo: GeoPoint | null
    priceFrom: number | null
    status: BookingStatus
    opensAt: string | null
    updatedAt: string
}

export interface EventDetail extends EventSummary {
    about: string[]
    highlights: string[]
    schedule: ScheduleItem[]
    hosts: EventHost[]
    faqs: EventFaq[]
    ageLimit: string
    language: string
    dressCode: string
    included: string[]
    notIncluded: string[]
    thingsToKnow: string[]
    terms: string
    refundPolicy: string
    mapUrl: string
    tickets: TicketView[]
}

export interface EventPageData {
    event: EventDetail
    gallery: Photo[]
    related: EventSummary[]
    preview: boolean
}

export interface PastEventRecap {
    event: EventSummary
    photos: Photo[]
}

export type EventWhen = 'upcoming' | 'past'

export interface EventFilters {
    when: EventWhen
    city: string | null
    category: EventCategory | null
}
