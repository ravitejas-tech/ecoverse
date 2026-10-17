import { Badge } from '~/components/ui/badge'
import { NEEDS_REFUND_BADGE, ORDER_STATUS_LABELS, ORDER_STATUS_TONES } from '~/data/orders/status'
import type { Tables } from '~/types/database'

export function OrderStatusBadge({ status, needs_refund }: Pick<Tables<'orders'>, 'status' | 'needs_refund'>) {
    return needs_refund ? (
        <Badge tone={NEEDS_REFUND_BADGE.tone}>{NEEDS_REFUND_BADGE.label}</Badge>
    ) : (
        <Badge tone={ORDER_STATUS_TONES[status]}>{ORDER_STATUS_LABELS[status]}</Badge>
    )
}
