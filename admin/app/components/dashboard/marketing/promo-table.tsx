import { DataTable } from '~/components/ui/data-table'
import { Panel } from '~/components/ui/panel'
import { Text } from '~/components/ui/text'
import { DASHBOARD_COPY } from '~/data/dashboard/copy'
import { PROMO_COLUMNS } from '~/data/dashboard/tables'
import type { DashboardPromoCode } from '~/types/dashboard'

const { promos } = DASHBOARD_COPY

export function PromoTable({ codes }: { codes: DashboardPromoCode[] }) {
    return (
        <Panel title={promos.title}>
            <DataTable
                columns={PROMO_COLUMNS}
                rows={codes}
                rowKey={({ code }) => code}
                caption={promos.caption}
                empty={<Text tone='secondary'>{promos.empty}</Text>}
            />
        </Panel>
    )
}
