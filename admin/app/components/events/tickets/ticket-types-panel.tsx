import { useState } from 'react'
import { Plus } from 'lucide-react'
import { TicketPresets } from '~/components/events/tickets/ticket-presets'
import { TicketTypeDialog } from '~/components/events/tickets/ticket-type-dialog'
import { TicketTypeRow } from '~/components/events/tickets/ticket-type-row'
import { Button } from '~/components/ui/button'
import { ConfirmDialog } from '~/components/ui/confirm-dialog'
import { Panel } from '~/components/ui/panel'
import { Spinner } from '~/components/ui/spinner'
import { Text } from '~/components/ui/text'
import { TICKETS_COPY } from '~/data/events/tickets'
import { LOADING_LABEL } from '~/data/ui/feedback'
import { useDeleteTicketType, useReorderTicketTypes } from '~/hooks/events/tickets/mutations'
import { useTicketTypes } from '~/hooks/events/tickets/queries'
import { useCan } from '~/hooks/staff/use-can'
import { moveItem } from '~/lib/array'
import type { TicketDraft, TicketTypeStock } from '~/types/ticket-types'

export function TicketTypesPanel({ eventId }: { eventId: string }) {
    const canEdit = useCan('editEvents')
    const { data: tickets = [], isPending } = useTicketTypes({ variables: eventId })
    const [draft, setDraft] = useState<TicketDraft | null>(null)
    const [deleting, setDeleting] = useState<TicketTypeStock | null>(null)
    const { mutate: reorder, isPending: reordering } = useReorderTicketTypes()
    const { mutate: remove, isPending: removing } = useDeleteTicketType()
    const nextSortOrder = Math.max(-1, ...tickets.map(({ sort_order }) => sort_order)) + 1

    return (
        <div className='space-y-6'>
            <Panel
                title={TICKETS_COPY.title}
                action={
                    canEdit && (
                        <Button
                            size='sm'
                            onClick={() => setDraft({})}>
                            <Plus />
                            {TICKETS_COPY.add}
                        </Button>
                    )
                }>
                {isPending && <Spinner label={LOADING_LABEL} />}
                {!isPending && tickets.length === 0 && (
                    <div className='space-y-1'>
                        <Text variant='label'>{TICKETS_COPY.empty.title}</Text>
                        <Text
                            variant='small'
                            tone='secondary'>
                            {TICKETS_COPY.empty.body}
                        </Text>
                    </div>
                )}
                <ul className='space-y-3'>
                    {tickets.map((ticket, index) => (
                        <TicketTypeRow
                            key={ticket.id}
                            ticket={ticket}
                            canEdit={canEdit && !reordering}
                            index={index}
                            count={tickets.length}
                            onEdit={() => setDraft({ ticket })}
                            onMove={(from, to) => reorder(moveItem(tickets, from, to).map(({ id }) => id))}
                            onDelete={() => setDeleting(ticket)}
                        />
                    ))}
                </ul>
            </Panel>
            {canEdit && <TicketPresets onPick={(preset) => setDraft({ preset })} />}
            {draft && (
                <TicketTypeDialog
                    eventId={eventId}
                    draft={draft}
                    nextSortOrder={nextSortOrder}
                    onClose={() => setDraft(null)}
                />
            )}
            <ConfirmDialog
                open={Boolean(deleting)}
                onClose={() => setDeleting(null)}
                title={TICKETS_COPY.deleteTitle}
                description={TICKETS_COPY.deleteBody}
                confirmLabel={TICKETS_COPY.deleteConfirm}
                danger
                pending={removing}
                onConfirm={() => deleting && remove(deleting.id, { onSettled: () => setDeleting(null) })}
            />
        </div>
    )
}
