import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Button } from '~/components/ui/button'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { AUTH_COPY } from '~/data/auth/copy'
import { AUTH_PATHS } from '~/data/auth/session'
import { useUpdatePassword } from '~/hooks/auth/mutations'
import { newPasswordSchema, type NewPasswordValues } from '~/schemas/auth'

const { setPassword } = AUTH_COPY

export function SetPasswordForm() {
    const navigate = useNavigate()
    const { mutate, isPending } = useUpdatePassword()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewPasswordValues>({ resolver: zodResolver(newPasswordSchema) })

    return (
        <form
            noValidate
            className='space-y-5'
            onSubmit={handleSubmit(({ password }) =>
                mutate(password, { onSuccess: () => navigate(AUTH_PATHS.home, { replace: true }) }),
            )}>
            <Field
                label={setPassword.password}
                htmlFor='new-password'
                error={errors.password?.message}>
                <Input
                    id='new-password'
                    type='password'
                    autoComplete='new-password'
                    aria-invalid={Boolean(errors.password)}
                    {...register('password')}
                />
            </Field>
            <Field
                label={setPassword.confirm}
                htmlFor='confirm-password'
                error={errors.confirm?.message}>
                <Input
                    id='confirm-password'
                    type='password'
                    autoComplete='new-password'
                    aria-invalid={Boolean(errors.confirm)}
                    {...register('confirm')}
                />
            </Field>
            <Button
                type='submit'
                size='lg'
                className='w-full'
                disabled={isPending}>
                {setPassword.submit}
            </Button>
        </form>
    )
}
