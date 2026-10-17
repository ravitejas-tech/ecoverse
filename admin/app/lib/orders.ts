import { CANCELLABLE_STATUSES, ORDER_FILTERS, REFUNDABLE_STATUSES } from '~/data/orders/status'
import type { Tables } from '~/types/database'
import type { OrderFilter } from '~/types/orders'

type OrderState = Pick<Tables<'orders'>, 'status' | 'needs_refund' | 'total'>

export function parseOrderFilter(value: string | null): OrderFilter {
    return ORDER_FILTERS.find((option) => option.value === value)?.value ?? 'all'
}

export function countPeople(items: readonly { quantity: number; admits: number }[]) {
    return items.reduce((sum, { quantity, admits }) => sum + quantity * admits, 0)
}

export function canRefund({ status, needs_refund, total }: OrderState) {
    return total > 0 && (needs_refund || REFUNDABLE_STATUSES.includes(status))
}

export function canCancel({ status }: OrderState) {
    return CANCELLABLE_STATUSES.includes(status)
}

export function ticketPageUrl(accessToken: string) {
    return `${import.meta.env.VITE_WEBSITE_URL}/tickets/${accessToken}`
}
