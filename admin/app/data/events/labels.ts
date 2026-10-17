import type { Enums } from '~/types/database'

export const CATEGORY_LABELS: Record<Enums<'event_category'>, string> = {
    dance_night: 'Dance night',
    social_mixer: 'Social mixer',
    workshop: 'Workshop',
    weekend_trip: 'Weekend trip',
    nightlife: 'Nightlife',
    meetup: 'Meetup',
}

export const EVENT_STATUS_LABELS: Record<Enums<'event_status'>, string> = {
    draft: 'Draft',
    published: 'Published',
}

export const TONE_LABELS: Record<Enums<'pop_tone'>, string> = {
    pink: 'Pink',
    yellow: 'Yellow',
    cyan: 'Cyan',
    lime: 'Lime',
    violet: 'Violet',
    orange: 'Orange',
}

export const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({ value, label }))

export const TONE_OPTIONS = Object.entries(TONE_LABELS).map(([value, label]) => ({
    value: value as Enums<'pop_tone'>,
    label,
}))
