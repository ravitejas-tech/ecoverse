import { OrderStatusBadge } from '~/components/orders/order-status-badge'
import { DataTable } from '~/components/ui/data-table'
import { EmptyState } from '~/components/ui/empty-state'
import { Text } from '~/components/ui/text'
import { ORDERS_COPY } from '~/data/orders/copy'
import { DIRECT_SOURCE, ORDERS_PATH } from '~/data/orders/query'
import { formatDateTime, formatRupees } from '~/lib/format'
import { countPeople } from '~/lib/orders'
import type { OrderListItem } from '~/types/orders'
import type { TableColumn } from '~/types/table'

const { columns, list, sources } = ORDERS_COPY

const ORDER_COLUMNS: TableColumn<OrderListItem>[] = [
    {
        key: 'booking',
        header: columns.booking,
        cell: (order) => (
            <Text
                as='span'
                variant='code'
                className='whitespace-nowrap'>
                {order.booking_code}
            </Text>
        ),
        wideOnPhone: true,
    },
    { key: 'buyer', header: columns.buyer, cell: (order) => order.name },
    { key: 'event', header: columns.event, cell: (order) => order.events?.title },
    {
        key: 'people',
        header: columns.people,
        cell: (order) => countPeople(order.order_items),
        align: 'end',
        hideOnPhone: true,
    },
    { key: 'total', header: columns.total, cell: (order) => formatRupees(order.total), align: 'end' },
    { key: 'status', header: columns.status, cell: (order) => <OrderStatusBadge {...order} /> },
    {
        key: 'source',
        header: columns.source,
        cell: (order) => (order.source === 'complimentary' ? sources.complimentary : order.utm_source || DIRECT_SOURCE),
        hideOnPhone: true,
    },
    { key: 'date', header: columns.date, cell: (order) => formatDateTime(order.created_at) },
]

export function OrdersTable({ orders }: { orders: OrderListItem[] }) {
    return (
        <DataTable
            columns={ORDER_COLUMNS}
            rows={orders}
            rowKey={(order) => order.id}
            rowHref={(order) => `${ORDERS_PATH}/${order.id}`}
            caption={list.caption}
            empty={<EmptyState {...list.empty} />}
        />
    )
}
