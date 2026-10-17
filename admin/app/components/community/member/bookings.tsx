import { OrderStatusBadge } from '~/components/orders/order-status-badge'
import { DataTable } from '~/components/ui/data-table'
import { EmptyState } from '~/components/ui/empty-state'
import { Spinner } from '~/components/ui/spinner'
import { Text } from '~/components/ui/text'
import { COMMUNITY_COPY } from '~/data/community/copy'
import { ORDERS_PATH } from '~/data/orders/query'
import { LOADING_LABEL } from '~/data/ui/feedback'
import { useMemberBookings } from '~/hooks/community/queries'
import { formatDate, formatRupees } from '~/lib/format'
import { countPeople } from '~/lib/orders'
import type { MemberBooking } from '~/types/community'
import type { TableColumn } from '~/types/table'

const { member: copy, none } = COMMUNITY_COPY
const { bookingColumns: columns } = copy

const BOOKING_COLUMNS: TableColumn<MemberBooking>[] = [
    { key: 'event', header: columns.event, cell: (booking) => booking.events?.title ?? none, wideOnPhone: true },
    {
        key: 'date',
        header: columns.date,
        cell: (booking) => (booking.events ? formatDate(booking.events.starts_at) : none),
        nowrap: true,
    },
    {
        key: 'booking',
        header: columns.booking,
        cell: (booking) => (
            <Text
                as='span'
                variant='code'>
                {booking.booking_code}
            </Text>
        ),
        hideOnPhone: true,
        nowrap: true,
    },
    {
        key: 'tickets',
        header: columns.tickets,
        cell: (booking) => countPeople(booking.order_items),
        align: 'end',
        hideOnPhone: true,
    },
    { key: 'total', header: columns.total, cell: (booking) => formatRupees(booking.total), align: 'end' },
    { key: 'status', header: columns.status, cell: (booking) => <OrderStatusBadge {...booking} /> },
]

export function MemberBookings({ customerId }: { customerId: string }) {
    const { data: bookings = [], isPending } = useMemberBookings({ variables: customerId })

    return (
        <section className='space-y-4'>
            <Text
                as='h2'
                variant='title'>
                {copy.bookings}
            </Text>
            {isPending ? (
                <Spinner label={LOADING_LABEL} />
            ) : (
                <DataTable
                    columns={BOOKING_COLUMNS}
                    rows={bookings}
                    rowKey={(booking) => booking.id}
                    rowHref={(booking) => `${ORDERS_PATH}/${booking.id}`}
                    caption={copy.bookingsCaption}
                    empty={<EmptyState {...copy.noBookings} />}
                />
            )}
        </section>
    )
}
