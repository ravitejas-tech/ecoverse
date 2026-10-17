import { Link, Outlet } from 'react-router'
import { EventHeader } from '~/components/events/header/event-header'
import { Button } from '~/components/ui/button'
import { EmptyState } from '~/components/ui/empty-state'
import { Notice } from '~/components/ui/notice'
import { Spinner } from '~/components/ui/spinner'
import { TabsNav } from '~/components/ui/tabs-nav'
import { EVENT_HEADER_COPY } from '~/data/events/copy'
import { EVENT_PATHS, eventTabs } from '~/data/events/links'
import { ERROR_COPY, LOADING_LABEL } from '~/data/ui/feedback'
import { useEvent } from '~/hooks/events/queries'
import { requirePermission } from '~/lib/guards'
import type { EventOutletContext } from '~/types/events'
import type { Route } from './+types/layout'

export async function clientLoader() {
    await requirePermission('viewEvents')
    return null
}

export default function EventLayout({ params }: Route.ComponentProps) {
    const { data: event, isPending, isError } = useEvent({ variables: params.id })

    if (isPending) return <Spinner label={LOADING_LABEL} />
    if (isError) return <Notice tone='pink'>{ERROR_COPY.failed.details}</Notice>
    if (!event)
        return (
            <EmptyState
                {...EVENT_HEADER_COPY.notFound}
                action={
                    <Button asChild>
                        <Link to={EVENT_PATHS.list}>{EVENT_HEADER_COPY.back}</Link>
                    </Button>
                }
            />
        )

    return (
        <>
            <EventHeader event={event} />
            <TabsNav
                items={eventTabs(event.id)}
                label={EVENT_HEADER_COPY.tabsLabel}
            />
            <Outlet context={{ event } satisfies EventOutletContext} />
        </>
    )
}
