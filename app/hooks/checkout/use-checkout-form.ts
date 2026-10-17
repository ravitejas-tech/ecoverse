import { useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { buildCheckoutSchema } from '~/schemas/checkout'
import type { CheckoutFormInput, CheckoutFormValues, EventQuestion } from '~/types/checkout'

export function useCheckoutForm(questions: EventQuestion[]) {
    const schema = useMemo(() => buildCheckoutSchema(questions), [questions])
    return useForm<CheckoutFormInput, unknown, CheckoutFormValues>({
        resolver: zodResolver(schema),
        mode: 'onTouched',
        defaultValues: {
            name: '',
            phone: '',
            email: '',
            answers: Object.fromEntries(questions.map(({ id }) => [id, ''])),
            termsAccepted: false,
            marketingConsent: false,
        },
    })
}
