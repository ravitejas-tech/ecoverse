import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Dialog } from '~/components/ui/dialog'
import { SelectField } from '~/components/ui/select-field'
import { TextField } from '~/components/ui/text-field'
import { COMPLIMENTARY_COPY, COMPLIMENTARY_DEFAULTS, COMPLIMENTARY_FORM_ID } from '~/data/attendees/complimentary'
import { useIssueComplimentary } from '~/hooks/attendees/mutations'
import { complimentarySchema, type ComplimentaryValues } from '~/schemas/complimentary'
import type { SelectOption } from '~/components/ui/select'

const { fields } = COMPLIMENTARY_COPY

export interface ComplimentaryDialogProps {
    eventId: string
    ticketOptions: readonly SelectOption[]
    onClose: () => void
}

export function ComplimentaryDialog({ eventId, ticketOptions, onClose }: ComplimentaryDialogProps) {
    const { mutate, isPending } = useIssueComplimentary()
    const form = useForm<ComplimentaryValues>({
        resolver: zodResolver(complimentarySchema),
        defaultValues: { ...COMPLIMENTARY_DEFAULTS, ticket_type_id: ticketOptions[0]?.value ?? '' },
    })

    return (
        <Dialog
            open
            onClose={onClose}
            title={COMPLIMENTARY_COPY.title}
            description={COMPLIMENTARY_COPY.description}
            footer={
                <>
                    <Button
                        variant='secondary'
                        onClick={onClose}>
                        {COMPLIMENTARY_COPY.cancel}
                    </Button>
                    <Button
                        type='submit'
                        form={COMPLIMENTARY_FORM_ID}
                        disabled={isPending}>
                        {isPending ? COMPLIMENTARY_COPY.sending : COMPLIMENTARY_COPY.submit}
                    </Button>
                </>
            }>
            <FormProvider {...form}>
                <form
                    id={COMPLIMENTARY_FORM_ID}
                    noValidate
                    className='space-y-4'
                    onSubmit={form.handleSubmit((values) => mutate({ eventId, values }, { onSuccess: onClose }))}>
                    <div className='grid gap-4 sm:grid-cols-3'>
                        <SelectField<ComplimentaryValues>
                            name='ticket_type_id'
                            label={fields.ticket_type_id.label}
                            placeholder={fields.ticket_type_id.placeholder}
                            options={ticketOptions}
                            className='sm:col-span-2'
                            required
                        />
                        <TextField<ComplimentaryValues>
                            name='quantity'
                            type='number'
                            inputMode='numeric'
                            min={1}
                            label={fields.quantity.label}
                            valueAsNumber
                            required
                        />
                    </div>
                    <TextField<ComplimentaryValues>
                        name='name'
                        autoComplete='off'
                        label={fields.name.label}
                        placeholder={fields.name.placeholder}
                        required
                    />
                    <TextField<ComplimentaryValues>
                        name='email'
                        type='email'
                        autoComplete='off'
                        label={fields.email.label}
                        placeholder={fields.email.placeholder}
                        required
                    />
                    <TextField<ComplimentaryValues>
                        name='phone'
                        type='tel'
                        inputMode='tel'
                        autoComplete='off'
                        label={fields.phone.label}
                        placeholder={fields.phone.placeholder}
                        required
                    />
                    <TextField<ComplimentaryValues>
                        name='note'
                        label={fields.note.label}
                        hint={fields.note.hint}
                    />
                </form>
            </FormProvider>
        </Dialog>
    )
}
