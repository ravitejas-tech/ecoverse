import type { PopTone } from '~/data/ui/pop-tones'
import type { OrderFilter, OrderStatus } from '~/types/orders'
import type { Tables } from '~/types/database'

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
    pending: 'Pending',
    paid: 'Paid',
    expired: 'Expired',
    failed: 'Failed',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
}

export const ORDER_STATUS_TONES: Record<OrderStatus, PopTone | 'muted'> = {
    pending: 'yellow',
    paid: 'lime',
    expired: 'muted',
    failed: 'pink',
    cancelled: 'pink',
    refunded: 'violet',
}

export const NEEDS_REFUND_BADGE = { label: 'Needs refund', tone: 'orange' } as const

export const ORDER_FILTERS = [
    { value: 'all', label: 'All' },
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'refunded', label: 'Refunded' },
    { value: 'needs_refund', label: 'Needs refund' },
    { value: 'free', label: 'Free tickets' },
] as const

export const ORDER_FILTER_MATCH: Record<
    OrderFilter,
    Partial<Pick<Tables<'orders'>, 'status' | 'needs_refund' | 'source'>>
> = {
    all: {},
    paid: { status: 'paid' },
    pending: { status: 'pending' },
    cancelled: { status: 'cancelled' },
    refunded: { status: 'refunded' },
    needs_refund: { needs_refund: true },
    free: { source: 'complimentary' },
}

export const REFUNDABLE_STATUSES: readonly OrderStatus[] = ['paid', 'cancelled']

export const CANCELLABLE_STATUSES: readonly OrderStatus[] = ['paid', 'pending']

export const TICKET_PAGE_STATUSES: readonly OrderStatus[] = ['paid', 'cancelled', 'refunded']

export const PAYMENT_PROVIDER_LABELS: Partial<Record<string, string>> = {
    razorpay: 'Razorpay',
    test: 'Test payment',
    complimentary: 'Free ticket',
}

export const NOTES_MAX_LENGTH = 2000

export const REASON_MIN_LENGTH = 3
