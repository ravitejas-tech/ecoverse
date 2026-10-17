import { DuplicateEventButton } from '~/components/events/duplicate-event-button'
import { PauseSalesButton } from '~/components/events/header/pause-sales-button'
import { PublishButton } from '~/components/events/header/publish-button'
import { ExternalLinkButton } from '~/components/ui/external-link-button'
import { EVENT_HEADER_COPY } from '~/data/events/copy'
import { useCan } from '~/hooks/staff/use-can'
import { eventPreviewUrl, eventPublicUrl } from '~/lib/website'
import type { EventRow } from '~/types/events'

export function EventActions({ event }: { event: EventRow }) {
    const canEdit = useCan('editEvents')
    const published = event.status === 'published'

    return (
        <div className='grid grid-cols-2 gap-2 sm:flex sm:flex-wrap'>
            {canEdit && (
                <PublishButton
                    event={event}
                    className='col-span-2 sm:col-span-1'
                />
            )}
            {canEdit && published && <PauseSalesButton event={event} />}
            {published ? (
                <ExternalLinkButton href={eventPublicUrl(event.slug)}>{EVENT_HEADER_COPY.viewLive}</ExternalLinkButton>
            ) : (
                <ExternalLinkButton href={eventPreviewUrl(event)}>{EVENT_HEADER_COPY.preview}</ExternalLinkButton>
            )}
            {canEdit && <DuplicateEventButton eventId={event.id} />}
        </div>
    )
}
