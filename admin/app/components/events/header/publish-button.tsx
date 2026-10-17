import { useState } from 'react'
import { Rocket, Undo2 } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { ConfirmDialog } from '~/components/ui/confirm-dialog'
import { Dialog } from '~/components/ui/dialog'
import { Text } from '~/components/ui/text'
import { EVENT_HEADER_COPY } from '~/data/events/copy'
import { useUpdateEvent } from '~/hooks/events/mutations'
import { useTicketTypes } from '~/hooks/events/tickets/queries'
import { publishBlockers } from '~/lib/events/publish'
import type { EventRow } from '~/types/events'

const { blockers: blockerCopy, unpublishConfirm } = EVENT_HEADER_COPY

export function PublishButton({ event, className }: { event: EventRow; className?: string }) {
    const [dialog, setDialog] = useState<'blockers' | 'unpublish' | null>(null)
    const { data: ticketTypes = [] } = useTicketTypes({ variables: event.id })
    const { mutate, isPending } = useUpdateEvent()
    const blockers = publishBlockers(event, ticketTypes)
    const close = () => setDialog(null)

    const publish = () =>
        blockers.length > 0
            ? setDialog('blockers')
            : mutate({
                  id: event.id,
                  patch: { status: 'published', published_at: new Date().toISOString() },
                  notice: 'published',
              })

    return (
        <>
            {event.status === 'published' ? (
                <Button
                    variant='secondary'
                    className={className}
                    disabled={isPending}
                    onClick={() => setDialog('unpublish')}>
                    <Undo2 />
                    {EVENT_HEADER_COPY.unpublish}
                </Button>
            ) : (
                <Button
                    className={className}
                    disabled={isPending}
                    onClick={publish}>
                    <Rocket />
                    {EVENT_HEADER_COPY.publish}
                </Button>
            )}
            <Dialog
                open={dialog === 'blockers'}
                onClose={close}
                title={blockerCopy.title}
                description={blockerCopy.description}
                footer={<Button onClick={close}>{blockerCopy.close}</Button>}>
                <ul className='list-disc space-y-2 pl-5'>
                    {blockers.map((blocker) => (
                        <Text
                            key={blocker}
                            as='li'>
                            {blocker}
                        </Text>
                    ))}
                </ul>
            </Dialog>
            <ConfirmDialog
                open={dialog === 'unpublish'}
                onClose={close}
                {...unpublishConfirm}
                confirmLabel={unpublishConfirm.confirm}
                danger
                pending={isPending}
                onConfirm={() =>
                    mutate({ id: event.id, patch: { status: 'draft' }, notice: 'unpublished' }, { onSuccess: close })
                }
            />
        </>
    )
}
