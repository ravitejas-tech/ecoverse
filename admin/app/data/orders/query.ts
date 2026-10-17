export const ORDERS_PAGE_SIZE = 25

export const ORDER_PARAMS = {
    status: 'status',
    event: 'event',
    search: 'q',
} as const

export const ORDERS_PATH = '/orders'

export const DIRECT_SOURCE = 'direct'

export const ORDER_SEARCH_COLUMNS = ['name', 'email', 'phone', 'booking_code'] as const
