import type { EventWhen } from '~/types/events'

export const EVENT_FILTER_PARAMS = {
    when: 'when',
    city: 'city',
    category: 'category',
} as const

export const WHEN_OPTIONS: { value: EventWhen; label: string }[] = [
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'past', label: 'Past' },
]

export const FILTER_LABELS = {
    when: 'Show',
    city: 'City',
    category: 'Type of event',
    allCities: 'All cities',
    allCategories: 'Everything',
} as const
