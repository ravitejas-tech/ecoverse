import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { TicketTypeFields } from '~/components/events/tickets/ticket-type-fields'
import { Button } from '~/components/ui/button'
import { Dialog } from '~/components/ui/dialog'
import { TICKET_FORM_ID, TICKETS_COPY } from '~/data/events/tickets'
import { useSaveTicketType } from '~/hooks/events/tickets/mutations'
import { formToTicket, ticketToForm } from '~/lib/events/tickets'
import { ticketTypeSchema, type TicketTypeValues } from '~/schemas/ticket-type'
import type { TicketDraft } from '~/types/ticket-types'

const { dialog } = TICKETS_COPY

export interface TicketTypeDialogProps {
    eventId: string
    draft: TicketDraft
    nextSortOrder: number
    onClose: () => void
}

export function TicketTypeDialog({
    eventId,
    draft: { ticket, preset },
    nextSortOrder,
    onClose,
}: TicketTypeDialogProps) {
    const { mutate, isPending } = useSaveTicketType()
    const form = useForm<TicketTypeValues>({
        resolver: zodResolver(ticketTypeSchema),
        defaultValues: ticketToForm(ticket ?? preset),
    })

    return (
        <Dialog
            open
            onClose={onClose}
            title={ticket ? dialog.editTitle : dialog.addTitle}
            footer={
                <>
                    <Button
                        variant='secondary'
                        onClick={onClose}>
                        {dialog.cancel}
                    </Button>
                    <Button
                        type='submit'
                        form={TICKET_FORM_ID}
                        disabled={isPending}>
                        {isPending ? dialog.saving : dialog.save}
                    </Button>
                </>
            }>
            <FormProvider {...form}>
                <form
                    id={TICKET_FORM_ID}
                    noValidate
                    onSubmit={form.handleSubmit((values) =>
                        mutate(
                            {
                                id: ticket?.id,
                                values: formToTicket(eventId, values, ticket?.sort_order ?? nextSortOrder),
                            },
                            { onSuccess: onClose },
                        ),
                    )}>
                    <TicketTypeFields />
                </form>
            </FormProvider>
        </Dialog>
    )
}
