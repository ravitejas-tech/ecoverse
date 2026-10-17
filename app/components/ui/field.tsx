import type { ReactNode } from 'react'
import { FieldError } from '~/components/ui/field-error'
import { Text } from '~/components/ui/text'
import { REQUIRED_MARK } from '~/data/ui/forms'

export interface FieldControlProps {
    id: string
    'aria-invalid': boolean
    'aria-describedby': string | undefined
    'aria-required': boolean
}

export interface FieldProps {
    id: string
    label: string
    hint?: string
    error?: string
    required?: boolean
    children: (control: FieldControlProps) => ReactNode
}

export function Field({ id, label, hint, error, required = false, children }: FieldProps) {
    const hintId = `${id}-hint`
    const errorId = `${id}-error`
    const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined

    return (
        <div className='space-y-2'>
            <label
                htmlFor={id}
                className='flex items-baseline gap-1'>
                <Text
                    as='span'
                    variant='label'>
                    {label}
                </Text>
                {required && (
                    <Text
                        as='span'
                        variant='label'
                        tone='accent'
                        aria-hidden>
                        {REQUIRED_MARK}
                    </Text>
                )}
            </label>
            {hint && (
                <Text
                    id={hintId}
                    variant='small'
                    tone='muted'>
                    {hint}
                </Text>
            )}
            {children({
                id,
                'aria-invalid': Boolean(error),
                'aria-describedby': describedBy,
                'aria-required': required,
            })}
            {error && <FieldError id={errorId}>{error}</FieldError>}
        </div>
    )
}
