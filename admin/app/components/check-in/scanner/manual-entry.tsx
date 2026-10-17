import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Panel } from '~/components/ui/panel'
import { CHECK_IN_COPY } from '~/data/check-in/copy'
import { manualEntrySchema, type ManualEntryValues } from '~/schemas/check-in'

const { manual } = CHECK_IN_COPY

export interface ManualEntryProps {
    onCheck: (value: string, options: { onSuccess: () => void }) => void
    pending: boolean
}

export function ManualEntry({ onCheck, pending }: ManualEntryProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ManualEntryValues>({ resolver: zodResolver(manualEntrySchema), defaultValues: { value: '' } })

    return (
        <Panel title={manual.title}>
            <form
                noValidate
                className='grid gap-3 sm:grid-cols-3 sm:items-start'
                onSubmit={handleSubmit(({ value }) => {
                    onCheck(value, { onSuccess: () => reset() })
                })}>
                <Field
                    label={manual.label}
                    htmlFor='manual-code'
                    className='sm:col-span-2'
                    error={errors.value?.message}>
                    <Input
                        id='manual-code'
                        autoComplete='off'
                        autoCapitalize='characters'
                        spellCheck={false}
                        placeholder={manual.placeholder}
                        aria-invalid={Boolean(errors.value)}
                        {...register('value')}
                    />
                </Field>
                <Button
                    type='submit'
                    size='lg'
                    disabled={pending}
                    className='sm:mt-7'>
                    {manual.submit}
                </Button>
            </form>
        </Panel>
    )
}
