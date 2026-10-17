import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ConfirmDialog } from '~/components/ui/confirm-dialog'
import { Field } from '~/components/ui/field'
import { Textarea } from '~/components/ui/textarea'
import { ORDERS_COPY } from '~/data/orders/copy'
import { useCancelOrder } from '~/hooks/orders/mutations'
import { cancelSchema, type CancelValues } from '~/schemas/orders'

const { cancel } = ORDERS_COPY

export interface CancelOrderDialogProps {
    orderId: string
    open: boolean
    onClose: () => void
}

export function CancelOrderDialog({ orderId, open, onClose }: CancelOrderDialogProps) {
    const { mutate, isPending } = useCancelOrder()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CancelValues>({ resolver: zodResolver(cancelSchema), defaultValues: { reason: '' } })

    const close = () => {
        reset()
        onClose()
    }

    return (
        <ConfirmDialog
            open={open}
            onClose={close}
            title={cancel.title}
            description={cancel.description}
            confirmLabel={cancel.confirm}
            danger
            pending={isPending}
            onConfirm={() => void handleSubmit(({ reason }) => mutate({ orderId, reason }, { onSuccess: close }))()}>
            <Field
                label={cancel.reason}
                htmlFor='cancel-reason'
                error={errors.reason?.message}
                required>
                <Textarea
                    id='cancel-reason'
                    rows={3}
                    placeholder={cancel.reasonPlaceholder}
                    aria-invalid={Boolean(errors.reason)}
                    {...register('reason')}
                />
            </Field>
        </ConfirmDialog>
    )
}
