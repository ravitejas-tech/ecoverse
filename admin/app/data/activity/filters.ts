import type { ActivityEntity, ActivityFilter } from '~/types/activity'

export const ACTIVITY_FILTERS = [
    { value: 'all', label: 'Everything' },
    { value: 'events', label: 'Events' },
    { value: 'tickets', label: 'Tickets' },
    { value: 'promo_codes', label: 'Promo codes' },
    { value: 'team', label: 'Team' },
    { value: 'orders', label: 'Orders' },
    { value: 'check_ins', label: 'Check-ins' },
] as const

export const ACTIVITY_FILTER_ENTITIES: Record<ActivityFilter, ActivityEntity | null> = {
    all: null,
    events: 'events',
    tickets: 'ticket_types',
    promo_codes: 'promo_codes',
    team: 'staff',
    orders: 'orders',
    check_ins: 'tickets',
}

export const ACTIVITY_PAGE_SIZE = 30

export const ACTIVITY_FILTER_PARAM = 'type'
