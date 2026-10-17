import { useSearchParams } from 'react-router'
import { TicketTypesPanel } from '~/components/events/tickets/ticket-types-panel'
import { Notice } from '~/components/ui/notice'
import { CREATED_PARAM } from '~/data/events/links'
import { TICKETS_COPY } from '~/data/events/tickets'
import { useEventOutlet } from '~/hooks/events/use-event-outlet'
import { requirePermission } from '~/lib/guards'

export async function clientLoader() {
    await requirePermission('viewEvents')
    return null
}

export default function EventTickets() {
    const { event } = useEventOutlet()
    const [params] = useSearchParams()

    return (
        <div className='space-y-6'>
            {params.has(CREATED_PARAM) && (
                <Notice
                    tone='lime'
                    title={TICKETS_COPY.createdTitle}>
                    {TICKETS_COPY.createdBody}
                </Notice>
            )}
            <TicketTypesPanel eventId={event.id} />
        </div>
    )
}
