import type { EventCategory, EventTone } from '~/types/events'

export const CATEGORY_TONES: Record<EventCategory, EventTone> = {
    dance_night: 'pink',
    social_mixer: 'yellow',
    workshop: 'cyan',
    weekend_trip: 'lime',
    nightlife: 'violet',
    meetup: 'orange',
}

export const DEFAULT_CATEGORY: EventCategory = 'dance_night'

export const DEFAULT_REGION = 'Maharashtra'

export const DEFAULT_POLICIES = {
    terms: 'Entry for ticket holders only. Each QR code admits one person once. Echoverse Hub may refuse entry for unsafe behaviour.',
    refund_policy:
        'Full refund up to 72 hours before the event. 50% refund up to 24 hours before. No refunds after that, but you can transfer your ticket to a friend by messaging us.',
} as const
