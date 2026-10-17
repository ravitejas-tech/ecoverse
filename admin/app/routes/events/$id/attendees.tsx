import { AttendeeList } from '~/components/attendees/attendee-list'
import { useEventOutlet } from '~/hooks/events/use-event-outlet'
import { requirePermission } from '~/lib/guards'

export async function clientLoader() {
    await requirePermission('viewEvents')
    return null
}

export default function EventAttendees() {
    const { event } = useEventOutlet()

    return <AttendeeList event={event} />
}
