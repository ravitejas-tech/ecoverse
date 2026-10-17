import { Copy } from 'lucide-react'
import { Link } from 'react-router'
import { DuplicateEventButton } from '~/components/events/duplicate-event-button'
import { Button } from '~/components/ui/button'
import { ExternalLinkButton } from '~/components/ui/external-link-button'
import { EVENTS_COPY } from '~/data/events/copy'
import { EVENT_PATHS } from '~/data/events/links'
import { useCan } from '~/hooks/staff/use-can'
import { useCopyText } from '~/hooks/use-copy-text'
import { eventPreviewUrl, eventPublicUrl } from '~/lib/website'
import type { EventRow } from '~/types/events'

export function EventCardActions({ event }: { event: EventRow }) {
    const canEdit = useCan('editEvents')
    const copyText = useCopyText()

    return (
        <div className='flex flex-wrap gap-2'>
            <Button
                asChild
                variant='secondary'
                size='sm'>
                <Link to={EVENT_PATHS.detail(event.id)}>{EVENTS_COPY.open}</Link>
            </Button>
            {canEdit && (
                <DuplicateEventButton
                    eventId={event.id}
                    size='sm'
                />
            )}
            {event.status === 'published' ? (
                <ExternalLinkButton
                    href={eventPublicUrl(event.slug)}
                    variant='ghost'
                    size='sm'>
                    {EVENTS_COPY.viewLive}
                </ExternalLinkButton>
            ) : (
                <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => copyText(eventPreviewUrl(event))}>
                    <Copy />
                    {EVENTS_COPY.copyPreview}
                </Button>
            )}
        </div>
    )
}
