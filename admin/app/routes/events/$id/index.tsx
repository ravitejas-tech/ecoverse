import { EventDetailsForm } from '~/components/events/details/event-details-form'
import { useEventOutlet } from '~/hooks/events/use-event-outlet'
import { requirePermission } from '~/lib/guards'

export async function clientLoader() {
    await requirePermission('viewEvents')
    return null
}

export default function EventDetails() {
    const { event } = useEventOutlet()

    return (
        <EventDetailsForm
            key={event.id}
            event={event}
        />
    )
}
