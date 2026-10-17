import { Badge } from '~/components/ui/badge'
import { Panel } from '~/components/ui/panel'
import { Text } from '~/components/ui/text'
import { DASHBOARD_COPY } from '~/data/dashboard/copy'
import { ORDER_BREAKDOWN } from '~/data/dashboard/orders'
import { formatCount, formatRupees } from '~/lib/format'
import type { DashboardStats } from '~/types/dashboard'

const { orders: copy } = DASHBOARD_COPY

export function OrderBreakdown({ orders, refunds }: Pick<DashboardStats, 'orders' | 'refunds'>) {
    return (
        <Panel title={copy.title}>
            <ul
                aria-label={copy.listLabel}
                className='flex flex-wrap gap-2'>
                {ORDER_BREAKDOWN.map(({ key, label, tone }) => (
                    <li key={key}>
                        <Badge tone={orders[key] > 0 ? tone : 'muted'}>
                            {copy.count(label, formatCount(orders[key]))}
                        </Badge>
                    </li>
                ))}
            </ul>
            <Text
                variant='small'
                tone='secondary'>
                {copy.refunded(formatRupees(refunds.amount))}
            </Text>
        </Panel>
    )
}
