import type { TicketStatus } from '~/types/events'

export const SCHEMA_CONTEXT = 'https://schema.org'

export const SCHEMA_ENUMS = {
    scheduled: 'https://schema.org/EventScheduled',
    offline: 'https://schema.org/OfflineEventAttendanceMode',
} as const

export const OFFER_AVAILABILITY: Partial<Record<TicketStatus, string>> = {
    'on-sale': 'https://schema.org/InStock',
    'few-left': 'https://schema.org/LimitedAvailability',
    'sold-out': 'https://schema.org/SoldOut',
}

export const SCHEMA_CURRENCY = 'INR'

export const SCHEMA_IDS = {
    organization: '/#organization',
    website: '/#website',
    webpage: '/#webpage',
    event: '#event',
    faq: '#faq',
} as const
