import { DASHBOARD_COPY } from '~/data/dashboard/copy'
import { ORDER_STATUS_LABELS, ORDER_STATUS_TONES } from '~/data/orders/status'
import type { OrderBreakdownItem } from '~/types/dashboard'
import type { OrderFilter } from '~/types/orders'

const { orders } = DASHBOARD_COPY

export const ORDER_BREAKDOWN: readonly OrderBreakdownItem[] = [
    { key: 'paid', label: ORDER_STATUS_LABELS.paid, tone: ORDER_STATUS_TONES.paid },
    { key: 'complimentary', label: orders.complimentary, tone: 'cyan' },
    { key: 'pending', label: ORDER_STATUS_LABELS.pending, tone: ORDER_STATUS_TONES.pending },
    { key: 'abandoned', label: orders.abandoned, tone: ORDER_STATUS_TONES.expired },
    { key: 'failed', label: ORDER_STATUS_LABELS.failed, tone: ORDER_STATUS_TONES.failed },
    { key: 'cancelled', label: ORDER_STATUS_LABELS.cancelled, tone: ORDER_STATUS_TONES.cancelled },
    { key: 'refunded', label: ORDER_STATUS_LABELS.refunded, tone: ORDER_STATUS_TONES.refunded },
]

export const NEEDS_REFUND_FILTER: OrderFilter = 'needs_refund'
