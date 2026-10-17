import type { ReactNode } from 'react'
import { PromoCodeActions } from '~/components/promo-codes/list/row-actions'
import { StackedCell } from '~/components/ui/stacked-cell'
import { PromoStatusBadge } from '~/components/promo-codes/list/status-badge'
import { DataTable } from '~/components/ui/data-table'
import { PROMO_CODES_COPY } from '~/data/promo-codes/copy'
import { formatDateTime, formatRupees } from '~/lib/format'
import { discountLabel, usesLabel } from '~/lib/promo-codes'
import type { PromoCodeOverview } from '~/types/promo-codes'
import type { TableColumn } from '~/types/table'

const { columns, caption, allEvents, never, discountGiven } = PROMO_CODES_COPY

const PROMO_CODE_COLUMNS: TableColumn<PromoCodeOverview>[] = [
    {
        key: 'code',
        header: columns.code,
        cell: ({ code, label }) => (
            <StackedCell
                main={code}
                sub={label}
                code
            />
        ),
    },
    { key: 'status', header: columns.status, cell: (code) => <PromoStatusBadge code={code} /> },
    { key: 'discount', header: columns.discount, cell: discountLabel },
    { key: 'uses', header: columns.uses, cell: usesLabel },
    { key: 'event', header: columns.event, cell: ({ events }) => events?.title ?? allEvents, wideOnPhone: true },
    {
        key: 'expires',
        header: columns.expires,
        cell: ({ expires_at }) => (expires_at ? formatDateTime(expires_at) : never),
    },
    {
        key: 'sales',
        header: columns.sales,
        cell: ({ stats }) => (
            <StackedCell
                main={formatRupees(stats?.revenue ?? 0)}
                sub={stats?.discount_total ? discountGiven(formatRupees(stats.discount_total)) : undefined}
            />
        ),
    },
]

export interface PromoCodesTableProps {
    codes: PromoCodeOverview[]
    onEdit?: (code: PromoCodeOverview) => void
    empty: ReactNode
}

export function PromoCodesTable({ codes, onEdit, empty }: PromoCodesTableProps) {
    const actionColumn: TableColumn<PromoCodeOverview>[] = onEdit
        ? [
              {
                  key: 'actions',
                  header: columns.actions,
                  cell: (code) => (
                      <PromoCodeActions
                          code={code}
                          onEdit={onEdit}
                      />
                  ),
                  wideOnPhone: true,
              },
          ]
        : []

    return (
        <DataTable
            columns={[...PROMO_CODE_COLUMNS, ...actionColumn]}
            rows={codes}
            rowKey={({ id }) => id}
            caption={caption}
            empty={empty}
        />
    )
}
