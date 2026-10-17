import type { ReactNode } from 'react'
import { Text } from '~/components/ui/text'
import { REQUIRED_MARK } from '~/data/ui/control'
import { cn } from '~/lib/utils'

export interface FieldProps {
    label: string
    htmlFor: string
    hint?: string
    error?: string
    required?: boolean
    className?: string
    children: ReactNode
}

export function Field({ label, htmlFor, hint, error, required, className, children }: FieldProps) {
    return (
        <div className={cn('space-y-2', className)}>
            <Text
                as='label'
                variant='label'
                htmlFor={htmlFor}
                className='block'>
                {required ? `${label}${REQUIRED_MARK}` : label}
            </Text>
            {children}
            {error ? (
                <Text
                    variant='error'
                    role='alert'>
                    {error}
                </Text>
            ) : (
                hint && (
                    <Text
                        variant='small'
                        tone='muted'>
                        {hint}
                    </Text>
                )
            )}
        </div>
    )
}
