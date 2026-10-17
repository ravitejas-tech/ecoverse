import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Button } from '~/components/ui/button'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { AUTH_COPY } from '~/data/auth/copy'
import { AUTH_PATHS } from '~/data/auth/session'
import { useSignIn } from '~/hooks/auth/mutations'
import { loginSchema, type LoginValues } from '~/schemas/auth'

const { login } = AUTH_COPY

export function LoginForm({ onForgot }: { onForgot: () => void }) {
    const navigate = useNavigate()
    const { mutate, isPending } = useSignIn()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) })

    return (
        <form
            noValidate
            className='space-y-5'
            onSubmit={handleSubmit((values) => mutate(values, { onSuccess: () => navigate(AUTH_PATHS.home) }))}>
            <Field
                label={login.email}
                htmlFor='email'
                error={errors.email?.message}>
                <Input
                    id='email'
                    type='email'
                    autoComplete='email'
                    aria-invalid={Boolean(errors.email)}
                    {...register('email')}
                />
            </Field>
            <Field
                label={login.password}
                htmlFor='password'
                error={errors.password?.message}>
                <Input
                    id='password'
                    type='password'
                    autoComplete='current-password'
                    aria-invalid={Boolean(errors.password)}
                    {...register('password')}
                />
            </Field>
            <div className='grid gap-3'>
                <Button
                    type='submit'
                    size='lg'
                    disabled={isPending}>
                    {login.submit}
                </Button>
                <Button
                    type='button'
                    variant='ghost'
                    onClick={onForgot}>
                    {login.forgot}
                </Button>
            </div>
        </form>
    )
}
