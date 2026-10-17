import { zodResolver } from '@hookform/resolvers/zod'
import { Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Spinner } from '~/components/ui/spinner'
import { SIGN_IN_COPY, SIGN_IN_IDS } from '~/data/account/sign-in'
import { emailFormSchema } from '~/schemas/sign-in'
import type { EmailFormValues } from '~/types/account'

export interface EmailFormProps {
    sending: boolean
    onSubmit: (email: string) => void
}

export function EmailForm({ sending, onSubmit }: EmailFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EmailFormValues>({ resolver: zodResolver(emailFormSchema), defaultValues: { email: '' } })

    return (
        <form
            onSubmit={handleSubmit(({ email }) => onSubmit(email))}
            noValidate
            className='space-y-5'>
            <Field
                id={SIGN_IN_IDS.email}
                label={SIGN_IN_COPY.emailLabel}
                error={errors.email?.message}
                required>
                {(control) => (
                    <Input
                        {...control}
                        {...register('email')}
                        type='email'
                        inputMode='email'
                        autoComplete='email'
                        placeholder={SIGN_IN_COPY.emailPlaceholder}
                        enterKeyHint='send'
                    />
                )}
            </Field>
            <Button
                type='submit'
                size='lg'
                className='w-full'
                disabled={sending}
                aria-busy={sending}>
                {sending ? <Spinner /> : <Mail aria-hidden />}
                {SIGN_IN_COPY.sendCode}
            </Button>
        </form>
    )
}
