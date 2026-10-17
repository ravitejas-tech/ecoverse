import type { OrderStatus } from '~/types/orders'

export const COMMUNITY_PATHS = {
    list: '/community',
    member: (id: string) => `/community/${id}`,
} as const

export const COMMUNITY_PAGE_SIZE = 25

export const COMMUNITY_EXPORT_BATCH_SIZE = 1000

export const COMMUNITY_PARAMS = {
    segment: 'show',
    sort: 'sort',
    search: 'q',
} as const

export const COMMUNITY_SEARCH_COLUMNS = ['name', 'email', 'phone', 'city'] as const

export const MEMBER_BOOKING_STATUSES = ['paid', 'cancelled', 'refunded'] as const satisfies readonly OrderStatus[]
