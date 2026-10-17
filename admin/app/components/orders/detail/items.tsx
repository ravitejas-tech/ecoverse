import { DividedList } from '~/components/ui/divided-list'
import { Panel } from '~/components/ui/panel'
import { Text } from '~/components/ui/text'
import { ORDERS_COPY } from '~/data/orders/copy'
import { formatRupees } from '~/lib/format'
import { cn } from '~/lib/utils'
import type { OrderDetail } from '~/types/orders'

const { detail } = ORDERS_COPY

export function OrderItems({ order }: { order: OrderDetail }) {
    const lines = [
        ...order.order_items.map(({ id, quantity, unit_price, ticket_types }) => ({
            key: id,
            label: `${ticket_types?.name ?? ''} × ${quantity}`,
            amount: formatRupees(quantity * unit_price),
            strong: false,
        })),
        ...(order.discount > 0
            ? [
                  { key: 'subtotal', label: detail.subtotal, amount: formatRupees(order.subtotal), strong: false },
                  {
                      key: 'discount',
                      label: detail.discount,
                      amount: `− ${formatRupees(order.discount)}`,
                      strong: false,
                  },
              ]
            : []),
        { key: 'total', label: detail.total, amount: formatRupees(order.total), strong: true },
    ]

    return (
        <Panel title={detail.items}>
            <DividedList>
                {lines.map(({ key, label, amount, strong }) => (
                    <li
                        key={key}
                        className={cn('flex items-baseline justify-between gap-4 py-2.5', strong && 'pt-4')}>
                        <Text variant={strong ? 'title' : 'body'}>{label}</Text>
                        <Text variant={strong ? 'price' : 'label'}>{amount}</Text>
                    </li>
                ))}
            </DividedList>
        </Panel>
    )
}
