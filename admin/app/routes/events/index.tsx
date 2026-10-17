import { Plus } from 'lucide-react'
import { Link } from 'react-router'
import { EventBrowser } from '~/components/events/list/event-browser'
import { Button } from '~/components/ui/button'
import { PageHeader } from '~/components/ui/page-header'
import { EVENTS_COPY } from '~/data/events/copy'
import { EVENT_PATHS } from '~/data/events/links'
import { useCan } from '~/hooks/staff/use-can'
import { requirePermission } from '~/lib/guards'

export async function clientLoader() {
    await requirePermission('viewEvents')
    return null
}

export default function Events() {
    const canEdit = useCan('editEvents')

    return (
        <>
            <PageHeader
                title={EVENTS_COPY.title}
                description={EVENTS_COPY.description}
                actions={
                    canEdit && (
                        <Button asChild>
                            <Link to={EVENT_PATHS.create}>
                                <Plus />
                                {EVENTS_COPY.newEvent}
                            </Link>
                        </Button>
                    )
                }
            />
            <EventBrowser />
        </>
    )
}
