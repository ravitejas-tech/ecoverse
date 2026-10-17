import type { EventCategory } from '~/types/events'

export const EVENT_CATEGORIES: Record<EventCategory, { label: string; plural: string }> = {
    dance_night: { label: 'Dance night', plural: 'Dance nights' },
    social_mixer: { label: 'Social mixer', plural: 'Social mixers' },
    workshop: { label: 'Workshop', plural: 'Workshops' },
    weekend_trip: { label: 'Weekend trip', plural: 'Weekend trips' },
    nightlife: { label: 'Nightlife', plural: 'Nightlife' },
    meetup: { label: 'Meetup', plural: 'Meetups' },
}
