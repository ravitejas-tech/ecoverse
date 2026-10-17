import { EVENT_HEADER_COPY } from '~/data/events/copy'

export const WEBSITE_PATHS = { events: '/events', previewParam: 'preview' } as const

export const EVENT_PATHS = {
    list: '/events',
    create: '/events/new',
    detail: (id: string) => `/events/${id}`,
    tickets: (id: string) => `/events/${id}/tickets`,
    questions: (id: string) => `/events/${id}/questions`,
    attendees: (id: string) => `/events/${id}/attendees`,
    order: (orderId: string) => `/orders/${orderId}`,
} as const

export const CREATED_PARAM = 'created'

export const eventTabs = (id: string) =>
    [
        { label: EVENT_HEADER_COPY.tabs.details, to: EVENT_PATHS.detail(id), end: true },
        { label: EVENT_HEADER_COPY.tabs.tickets, to: EVENT_PATHS.tickets(id) },
        { label: EVENT_HEADER_COPY.tabs.questions, to: EVENT_PATHS.questions(id) },
        { label: EVENT_HEADER_COPY.tabs.attendees, to: EVENT_PATHS.attendees(id) },
    ] as const
