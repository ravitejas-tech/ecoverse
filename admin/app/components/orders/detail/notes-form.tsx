import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Field } from '~/components/ui/field'
import { Panel } from '~/components/ui/panel'
import { Text } from '~/components/ui/text'
import { Textarea } from '~/components/ui/textarea'
import { ORDERS_COPY } from '~/data/orders/copy'
import { useUpdateOrderNotes } from '~/hooks/orders/mutations'
import { useCan } from '~/hooks/staff/use-can'
import { notesSchema, type NotesValues } from '~/schemas/orders'
import type { OrderDetail } from '~/types/orders'

const { notes: copy, detail } = ORDERS_COPY

export function OrderNotesForm({ order }: { order: OrderDetail }) {
    const canEdit = useCan('editOrderNotes')
    const { mutate, isPending } = useUpdateOrderNotes()
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm<NotesValues>({ resolver: zodResolver(notesSchema), values: { notes: order.notes } })

    if (!canEdit) {
        return (
            <Panel title={copy.title}>
                <Text tone={order.notes ? 'primary' : 'muted'}>{order.notes || detail.none}</Text>
            </Panel>
        )
    }

    return (
        <Panel title={copy.title}>
            <form
                noValidate
                className='space-y-4'
                onSubmit={handleSubmit(({ notes }) => mutate({ orderId: order.id, notes }))}>
                <Field
                    label={copy.label}
                    htmlFor='order-notes'
                    error={errors.notes?.message}>
                    <Textarea
                        id='order-notes'
                        placeholder={copy.placeholder}
                        aria-invalid={Boolean(errors.notes)}
                        {...register('notes')}
                    />
                </Field>
                <Button
                    type='submit'
                    variant='secondary'
                    className='w-full sm:w-auto'
                    disabled={!isDirty || isPending}>
                    {copy.save}
                </Button>
            </form>
        </Panel>
    )
}
