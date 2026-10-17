import { DailyChart } from '~/components/dashboard/daily/chart'
import { PromoTable } from '~/components/dashboard/marketing/promo-table'
import { SourceTable } from '~/components/dashboard/marketing/source-table'
import { OrderBreakdown } from '~/components/dashboard/orders/breakdown'
import { RefundAlert } from '~/components/dashboard/orders/refund-alert'
import { TicketSales } from '~/components/dashboard/tickets/sales'
import { StatCardGrid } from '~/components/ui/stat-card-grid'
import { DASHBOARD_STAT_CARDS } from '~/data/dashboard/stat-cards'
import { cn } from '~/lib/utils'
import type { DashboardStats } from '~/types/dashboard'

export interface DashboardOverviewProps {
    stats: DashboardStats
    eventId: string | null
    refreshing: boolean
}

export function DashboardOverview({ stats, eventId, refreshing }: DashboardOverviewProps) {
    return (
        <div
            aria-busy={refreshing}
            className={cn('space-y-6 transition-opacity', refreshing && 'opacity-60')}>
            <RefundAlert
                count={stats.orders.needs_refund}
                eventId={eventId}
            />
            <StatCardGrid
                cards={DASHBOARD_STAT_CARDS}
                source={stats}
            />
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
                <DailyChart
                    days={stats.daily}
                    className='lg:col-span-2'
                />
                <OrderBreakdown
                    orders={stats.orders}
                    refunds={stats.refunds}
                />
            </div>
            <TicketSales
                tickets={stats.ticket_types}
                showEvent={!eventId}
            />
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                <PromoTable codes={stats.promo_codes} />
                <SourceTable sources={stats.sources} />
            </div>
        </div>
    )
}
