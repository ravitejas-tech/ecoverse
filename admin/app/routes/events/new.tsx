import { NewEventForm } from '~/components/events/create/new-event-form'
import { PageHeader } from '~/components/ui/page-header'
import { NEW_EVENT_COPY } from '~/data/events/copy'
import { requirePermission } from '~/lib/guards'

export async function clientLoader() {
    await requirePermission('editEvents')
    return null
}

export default function NewEvent() {
    return (
        <>
            <PageHeader
                title={NEW_EVENT_COPY.title}
                description={NEW_EVENT_COPY.description}
            />
            <NewEventForm />
        </>
    )
}
