import { DetailList } from '~/components/ui/detail-list'
import { Panel } from '~/components/ui/panel'
import { ORDERS_COPY } from '~/data/orders/copy'
import { answerItems } from '~/lib/order-summary'
import type { OrderDetail } from '~/types/orders'

export function OrderAnswers({ order }: { order: OrderDetail }) {
    const items = answerItems(order.events?.questions, order.answers)
    if (items.length === 0) return null

    return (
        <Panel title={ORDERS_COPY.detail.answers}>
            <DetailList items={items} />
        </Panel>
    )
}
