import type { ACTIVITY_FILTERS } from '~/data/activity/filters'
import type { Tables } from '~/types/database'

export type ActivityFilter = (typeof ACTIVITY_FILTERS)[number]['value']

export type ActivityEntity = 'events' | 'ticket_types' | 'promo_codes' | 'staff' | 'orders' | 'tickets'

export type ActivityEntry = Tables<'activity_log'>

export interface ActivityItem {
    id: number
    actor: string
    sentence: string
    createdAt: string
}

export interface FieldChange {
    from: unknown
    to: unknown
}
