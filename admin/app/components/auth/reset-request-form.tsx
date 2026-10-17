import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { AUTH_COPY } from '~/data/auth/copy'
import { useSendPasswordReset } from '~/hooks/auth/mutations'
import { emailSchema, type EmailValues } from '~/schemas/auth'

export function ResetRequestForm({ onBack }: { onBack: () => void }) {
    const { mutate, isPending } = useSendPasswordReset()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EmailValues>({ resolver: zodResolver(emailSchema) })

    return (
        <form
            noValidate
            className='space-y-5'
            onSubmit={handleSubmit(({ email }) => mutate(email))}>
            <Field
                label={AUTH_COPY.login.email}
                htmlFor='reset-email'
                error={errors.email?.message}>
                <Input
                    id='reset-email'
                    type='email'
                    autoComplete='email'
                    aria-invalid={Boolean(errors.email)}
                    {...register('email')}
                />
            </Field>
            <div className='grid gap-3'>
                <Button
                    type='submit'
                    size='lg'
                    disabled={isPending}>
                    {AUTH_COPY.reset.submit}
                </Button>
                <Button
                    type='button'
                    variant='ghost'
                    onClick={onBack}>
                    {AUTH_COPY.reset.back}
                </Button>
            </div>
        </form>
    )
}
