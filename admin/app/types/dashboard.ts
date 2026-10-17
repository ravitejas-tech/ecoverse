import type { z } from 'zod'
import type { BadgeProps } from '~/components/ui/badge'
import type { dashboardStatsSchema } from '~/schemas/dashboard-stats'
import type { StatCardConfig } from '~/types/stat-card'

export type DashboardStats = z.infer<typeof dashboardStatsSchema>

export type DashboardOrderCounts = DashboardStats['orders']

export type DashboardTicketType = DashboardStats['ticket_types'][number]

export type DashboardPromoCode = DashboardStats['promo_codes'][number]

export type DashboardSource = DashboardStats['sources'][number]

export type DashboardDay = DashboardStats['daily'][number]

export type DashboardStatCard = StatCardConfig<DashboardStats>

export interface OrderBreakdownItem extends Required<Pick<BadgeProps, 'tone'>> {
    key: Exclude<keyof DashboardOrderCounts, 'needs_refund'>
    label: string
}
