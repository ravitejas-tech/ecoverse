import type { ORDER_FILTERS } from '~/data/orders/status'
import type { Enums } from '~/types/database'
import type { getOrder, listOrders } from '~/services/orders'

export type OrderStatus = Enums<'order_status'>

export type OrderFilter = (typeof ORDER_FILTERS)[number]['value']

export interface OrderQuery {
    eventId: string
    filter: OrderFilter
    search: string
}

export type OrderListItem = Awaited<ReturnType<typeof listOrders>>['rows'][number]

export type OrderDetail = NonNullable<Awaited<ReturnType<typeof getOrder>>>

export interface RefundRequest {
    orderId: string
    amount: number
    reason: string
}

export interface CancelRequest {
    orderId: string
    reason: string
}
