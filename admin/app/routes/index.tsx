import { redirect, useSearchParams } from 'react-router'
import { EventPicker } from '~/components/dashboard/event-picker'
import { LoadError } from '~/components/dashboard/load-error'
import { DashboardOverview } from '~/components/dashboard/overview'
import { PageHeader } from '~/components/ui/page-header'
import { Spinner } from '~/components/ui/spinner'
import { AUTH_PATHS } from '~/data/auth/session'
import { DASHBOARD_COPY } from '~/data/dashboard/copy'
import { DASHBOARD_PARAMS } from '~/data/dashboard/query'
import { LOADING_LABEL } from '~/data/ui/feedback'
import { useDashboardStats } from '~/hooks/dashboard/queries'
import { can } from '~/lib/permissions'
import { requireStaff } from '~/lib/guards'
import { withParam } from '~/lib/search-params'

export async function clientLoader() {
    const staff = await requireStaff()
    if (!can(staff.role, 'viewReports')) throw redirect(AUTH_PATHS.checkIn)
    return null
}

export default function Dashboard() {
    const [params, setParams] = useSearchParams()
    const eventId = params.get(DASHBOARD_PARAMS.event) || null
    const { data, isError, isPlaceholderData, refetch } = useDashboardStats({ variables: eventId })

    return (
        <>
            <PageHeader
                title={DASHBOARD_COPY.title}
                description={DASHBOARD_COPY.description}
                actions={
                    <EventPicker
                        value={eventId ?? ''}
                        onChange={(id) =>
                            setParams((current) => withParam(current, DASHBOARD_PARAMS.event, id), { replace: true })
                        }
                    />
                }
            />
            {data ? (
                <DashboardOverview
                    stats={data}
                    eventId={eventId}
                    refreshing={isPlaceholderData}
                />
            ) : isError ? (
                <LoadError onRetry={() => refetch()} />
            ) : (
                <Spinner label={LOADING_LABEL} />
            )}
        </>
    )
}
