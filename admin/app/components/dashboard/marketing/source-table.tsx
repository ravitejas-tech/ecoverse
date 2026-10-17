import { DataTable } from '~/components/ui/data-table'
import { Panel } from '~/components/ui/panel'
import { Text } from '~/components/ui/text'
import { DASHBOARD_COPY } from '~/data/dashboard/copy'
import { SOURCE_COLUMNS } from '~/data/dashboard/tables'
import type { DashboardSource } from '~/types/dashboard'

const { sources: copy } = DASHBOARD_COPY

export function SourceTable({ sources }: { sources: DashboardSource[] }) {
    return (
        <Panel title={copy.title}>
            <DataTable
                columns={SOURCE_COLUMNS}
                rows={sources}
                rowKey={({ source }) => source}
                caption={copy.caption}
                empty={<Text tone='secondary'>{copy.empty}</Text>}
            />
        </Panel>
    )
}
