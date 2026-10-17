import { Badge } from '~/components/ui/badge'
import { DividedList } from '~/components/ui/divided-list'
import { Panel } from '~/components/ui/panel'
import { Text } from '~/components/ui/text'
import { ORDERS_COPY } from '~/data/orders/copy'
import { formatDateTime } from '~/lib/format'
import type { OrderDetail } from '~/types/orders'

const { detail } = ORDERS_COPY

export function OrderTickets({ order }: { order: OrderDetail }) {
    return (
        <Panel title={detail.tickets}>
            {order.tickets.length === 0 ? (
                <Text tone='muted'>{detail.noTickets}</Text>
            ) : (
                <DividedList>
                    {order.tickets.map(({ id, code, status, checked_in_at, ticket_types }) => (
                        <li
                            key={id}
                            className='flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between'>
                            <div className='min-w-0'>
                                <Text variant='code'>{code}</Text>
                                <Text
                                    variant='small'
                                    tone='secondary'>
                                    {ticket_types?.name}
                                </Text>
                            </div>
                            {status === 'cancelled' ? (
                                <Badge tone='pink'>{detail.ticketCancelled}</Badge>
                            ) : (
                                <Text
                                    variant='small'
                                    tone={checked_in_at ? 'primary' : 'muted'}>
                                    {checked_in_at
                                        ? detail.checkedIn(formatDateTime(checked_in_at))
                                        : detail.notCheckedIn}
                                </Text>
                            )}
                        </li>
                    ))}
                </DividedList>
            )}
        </Panel>
    )
}
