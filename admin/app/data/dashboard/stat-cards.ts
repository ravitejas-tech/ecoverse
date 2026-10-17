import { Armchair, Eye, IndianRupee, MousePointerClick, Repeat, ScanLine, ShoppingBag, Ticket } from 'lucide-react'
import { DASHBOARD_COPY } from '~/data/dashboard/copy'
import { formatCount, formatPercent, formatRupees } from '~/lib/format'
import type { DashboardStatCard } from '~/types/dashboard'

const { stats, orderCount } = DASHBOARD_COPY

export const DASHBOARD_STAT_CARDS: readonly DashboardStatCard[] = [
    {
        key: 'sold',
        label: stats.sold.label,
        icon: Ticket,
        tone: 'pink',
        value: ({ tickets_sold }) => formatCount(tickets_sold),
        hint: ({ orders }) => stats.sold.hint(orderCount(orders.paid)),
    },
    {
        key: 'money',
        label: stats.money.label,
        icon: IndianRupee,
        tone: 'lime',
        value: ({ gross_sales }) => formatRupees(gross_sales),
        hint: ({ net_sales }) => stats.money.hint(formatRupees(net_sales)),
    },
    {
        key: 'checked-in',
        label: stats.checkedIn.label,
        icon: ScanLine,
        tone: 'cyan',
        value: ({ checked_in, tickets_sold }) => formatPercent(checked_in, tickets_sold),
        hint: ({ checked_in, tickets_sold }) =>
            stats.checkedIn.hint(formatCount(checked_in), formatCount(tickets_sold)),
    },
    {
        key: 'seats',
        label: stats.seats.label,
        icon: Armchair,
        tone: 'yellow',
        value: ({ remaining }) => formatCount(remaining),
        hint: ({ capacity }) => stats.seats.hint(formatCount(capacity)),
    },
    {
        key: 'visitors',
        label: stats.visitors.label,
        icon: Eye,
        tone: 'violet',
        value: ({ unique_visitors }) => formatCount(unique_visitors),
        hint: ({ page_views }) => stats.visitors.hint(formatCount(page_views)),
    },
    {
        key: 'booked',
        label: stats.booked.label,
        icon: MousePointerClick,
        tone: 'orange',
        value: ({ conversion_rate }) => formatPercent(conversion_rate),
        hint: () => stats.booked.hint,
    },
    {
        key: 'repeat',
        label: stats.repeat.label,
        icon: Repeat,
        tone: 'pink',
        value: ({ customers }) => formatPercent(customers.repeat, customers.total),
        hint: ({ customers }) => stats.repeat.hint(formatCount(customers.repeat), formatCount(customers.total)),
    },
    {
        key: 'average',
        label: stats.average.label,
        icon: ShoppingBag,
        tone: 'cyan',
        value: ({ average_order_value }) => formatRupees(average_order_value),
        hint: () => stats.average.hint,
    },
]
