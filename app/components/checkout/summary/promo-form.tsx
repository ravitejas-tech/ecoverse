import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Spinner } from '~/components/ui/spinner'
import { CHECKOUT_IDS } from '~/data/checkout/ids'
import { PROMO_COPY } from '~/data/checkout/summary'
import { promoFormSchema } from '~/schemas/promo'
import type { PromoFormValues } from '~/types/checkout'

export interface PromoFormProps {
    checking: boolean
    serverError?: string
    onApply: (code: string) => void
}

export function PromoForm({ checking, serverError, onApply }: PromoFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PromoFormValues>({ resolver: zodResolver(promoFormSchema), defaultValues: { code: '' } })

    return (
        <form
            onSubmit={handleSubmit(({ code }) => onApply(code))}
            noValidate>
            <Field
                id={CHECKOUT_IDS.promo}
                label={PROMO_COPY.label}
                error={errors.code?.message ?? serverError}>
                {(control) => (
                    <div className='flex gap-2'>
                        <Input
                            {...control}
                            {...register('code')}
                            className='flex-1'
                            placeholder={PROMO_COPY.placeholder}
                            autoComplete='off'
                            autoCapitalize='characters'
                            spellCheck={false}
                            enterKeyHint='go'
                            autoFocus
                        />
                        <Button
                            type='submit'
                            variant='secondary'
                            disabled={checking}>
                            {checking && <Spinner />}
                            {PROMO_COPY.apply}
                        </Button>
                    </div>
                )}
            </Field>
        </form>
    )
}
