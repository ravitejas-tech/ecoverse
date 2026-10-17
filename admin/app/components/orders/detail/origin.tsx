import { DetailList } from '~/components/ui/detail-list'
import { Panel } from '~/components/ui/panel'
import { ORDERS_COPY } from '~/data/orders/copy'
import { DIRECT_SOURCE } from '~/data/orders/query'
import { formatDateTime } from '~/lib/format'
import type { OrderDetail } from '~/types/orders'

const { detail } = ORDERS_COPY

export function OrderOrigin({ order }: { order: OrderDetail }) {
    return (
        <Panel title={detail.origin}>
            <DetailList
                items={[
                    { label: detail.utmSource, value: order.utm_source || DIRECT_SOURCE },
                    { label: detail.utmMedium, value: order.utm_medium || detail.none },
                    { label: detail.utmCampaign, value: order.utm_campaign || detail.none },
                    { label: detail.referrer, value: order.referrer || detail.none },
                    { label: detail.bookedAt, value: formatDateTime(order.created_at) },
                ]}
            />
        </Panel>
    )
}
