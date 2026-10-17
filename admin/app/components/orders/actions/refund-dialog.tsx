import { useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Dialog } from '~/components/ui/dialog'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { SegmentedControl } from '~/components/ui/segmented-control'
import { Textarea } from '~/components/ui/textarea'
import { ORDERS_COPY } from '~/data/orders/copy'
import { CONFIRM_DEFAULTS } from '~/data/ui/dialog'
import { useRefundOrder } from '~/hooks/orders/mutations'
import { formatRupees } from '~/lib/format'
import { createRefundSchema, type RefundValues } from '~/schemas/orders'

const { refund } = ORDERS_COPY

export interface RefundOrderDialogProps {
    orderId: string
    total: number
    open: boolean
    onClose: () => void
}

export function RefundOrderDialog({ orderId, total, open, onClose }: RefundOrderDialogProps) {
    const schema = useMemo(() => createRefundSchema(total), [total])
    const { mutate, isPending } = useRefundOrder()
    const defaultValues: RefundValues = { mode: 'full', amount: total, reason: '' }
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors },
    } = useForm<RefundValues>({ resolver: zodResolver(schema), defaultValues })
    const [mode, amount] = useWatch({ control, name: ['mode', 'amount'] })
    const refundAmount = mode === 'full' ? total : amount

    const close = () => {
        reset()
        onClose()
    }

    return (
        <Dialog
            open={open}
            onClose={close}
            title={refund.title}
            description={refund.description}
            footer={
                <>
                    <Button
                        variant='secondary'
                        onClick={close}>
                        {CONFIRM_DEFAULTS.cancel}
                    </Button>
                    <Button
                        type='submit'
                        form='refund-form'
                        disabled={isPending}>
                        {refund.confirm(formatRupees(Number.isFinite(refundAmount) ? refundAmount : 0))}
                    </Button>
                </>
            }>
            <form
                id='refund-form'
                noValidate
                className='space-y-5'
                onSubmit={handleSubmit((values) =>
                    mutate(
                        { orderId, reason: values.reason, amount: values.mode === 'full' ? total : values.amount },
                        { onSuccess: close },
                    ),
                )}>
                <SegmentedControl
                    label={refund.modeLabel}
                    options={[
                        { value: 'full', label: refund.full(formatRupees(total)) },
                        { value: 'partial', label: refund.partial },
                    ]}
                    value={mode}
                    onChange={(value) => setValue('mode', value)}
                />
                {mode === 'partial' && (
                    <Field
                        label={refund.amount}
                        htmlFor='refund-amount'
                        hint={refund.amountHint(formatRupees(total))}
                        error={errors.amount?.message}
                        required>
                        <Input
                            id='refund-amount'
                            type='number'
                            inputMode='numeric'
                            min={1}
                            max={total}
                            aria-invalid={Boolean(errors.amount)}
                            {...register('amount', { valueAsNumber: true })}
                        />
                    </Field>
                )}
                <Field
                    label={refund.reason}
                    htmlFor='refund-reason'
                    error={errors.reason?.message}
                    required>
                    <Textarea
                        id='refund-reason'
                        rows={3}
                        placeholder={refund.reasonPlaceholder}
                        aria-invalid={Boolean(errors.reason)}
                        {...register('reason')}
                    />
                </Field>
            </form>
        </Dialog>
    )
}
