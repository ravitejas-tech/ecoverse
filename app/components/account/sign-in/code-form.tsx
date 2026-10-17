import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Spinner } from '~/components/ui/spinner'
import { LOGIN_CODE_LENGTH } from '~/data/account/auth'
import { SIGN_IN_COPY, SIGN_IN_IDS } from '~/data/account/sign-in'
import { digitsOnly } from '~/lib/digits'
import { codeFormSchema } from '~/schemas/sign-in'
import type { CodeFormInput, CodeFormValues } from '~/types/account'

export interface CodeFormProps {
    email: string
    verifying: boolean
    onSubmit: (code: string) => void
}

export function CodeForm({ email, verifying, onSubmit }: CodeFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CodeFormInput, unknown, CodeFormValues>({
        resolver: zodResolver(codeFormSchema),
        defaultValues: { code: '' },
    })
    const submit = handleSubmit(({ code }) => onSubmit(code))
    const submitWhenComplete = (value: string) => {
        if (!verifying && digitsOnly(value).length === LOGIN_CODE_LENGTH) void submit()
    }

    return (
        <form
            onSubmit={submit}
            noValidate
            className='space-y-5'>
            <Field
                id={SIGN_IN_IDS.code}
                label={SIGN_IN_COPY.codeLabel}
                hint={SIGN_IN_COPY.codeHint(email)}
                error={errors.code?.message}
                required>
                {(control) => (
                    <Input
                        {...control}
                        {...register('code', { onChange: (event) => submitWhenComplete(event.target.value) })}
                        type='text'
                        inputMode='numeric'
                        autoComplete='one-time-code'
                        placeholder={SIGN_IN_COPY.codePlaceholder}
                        enterKeyHint='done'
                        autoFocus
                    />
                )}
            </Field>
            <Button
                type='submit'
                size='lg'
                className='w-full'
                disabled={verifying}
                aria-busy={verifying}>
                {verifying && <Spinner />}
                {SIGN_IN_COPY.verify}
            </Button>
        </form>
    )
}
