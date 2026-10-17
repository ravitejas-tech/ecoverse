import { OrderStatusBadge } from '~/components/orders/order-status-badge'
import { BackLink } from '~/components/ui/back-link'
import { Notice } from '~/components/ui/notice'
import { PageHeader } from '~/components/ui/page-header'
import { PopCard } from '~/components/ui/pop-card'
import { Text } from '~/components/ui/text'
import { ORDERS_COPY } from '~/data/orders/copy'
import { ORDERS_PATH } from '~/data/orders/query'
import { orderSummary } from '~/lib/order-summary'
import type { OrderDetail } from '~/types/orders'

const { detail } = ORDERS_COPY

export function OrderHero({ order }: { order: OrderDetail }) {
    return (
        <div className='space-y-4'>
            <PageHeader
                title={order.booking_code}
                description={order.events?.title}
                eyebrow={
                    <BackLink
                        to={ORDERS_PATH}
                        label={detail.back}
                    />
                }
            />
            <PopCard
                padding='md'
                className='flex flex-col items-start gap-3 sm:flex-row sm:items-center'>
                <OrderStatusBadge {...order} />
                <Text variant='title'>{orderSummary(order)}</Text>
            </PopCard>
            {order.needs_refund && (
                <Notice
                    tone='orange'
                    title={detail.needsRefund.title}>
                    {detail.needsRefund.body}
                </Notice>
            )}
        </div>
    )
}
