import { DASHBOARD_COPY } from '~/data/dashboard/copy'
import { formatCount, formatRupees } from '~/lib/format'
import type { DashboardPromoCode, DashboardSource } from '~/types/dashboard'
import type { TableColumn } from '~/types/table'

const { promos, sources } = DASHBOARD_COPY

export const PROMO_COLUMNS: TableColumn<DashboardPromoCode>[] = [
    { key: 'code', header: promos.columns.code, cell: ({ code }) => code },
    { key: 'uses', header: promos.columns.uses, cell: ({ uses }) => formatCount(uses), align: 'end' },
    { key: 'discount', header: promos.columns.discount, cell: ({ discount }) => formatRupees(discount), align: 'end' },
    { key: 'revenue', header: promos.columns.revenue, cell: ({ revenue }) => formatRupees(revenue), align: 'end' },
]

export const SOURCE_COLUMNS: TableColumn<DashboardSource>[] = [
    { key: 'source', header: sources.columns.source, cell: ({ source }) => source },
    { key: 'orders', header: sources.columns.orders, cell: ({ orders }) => formatCount(orders), align: 'end' },
    { key: 'revenue', header: sources.columns.revenue, cell: ({ revenue }) => formatRupees(revenue), align: 'end' },
]
