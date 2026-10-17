import type { InputHTMLAttributes, Ref } from 'react'
import { ControlFrame } from '~/components/ui/control-frame'
import { Text } from '~/components/ui/text'
import { CONTROL_TEXT } from '~/data/ui/forms'
import { cn } from '~/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    leading?: string
    ref?: Ref<HTMLInputElement>
}

export function Input({ leading, className, ...props }: InputProps) {
    return (
        <ControlFrame
            invalid={props['aria-invalid'] === true}
            className={className}>
            {leading && (
                <Text
                    as='span'
                    variant='label'
                    tone='secondary'
                    className='flex h-full items-center border-r-2 border-border bg-surface-muted px-3'
                    aria-hidden>
                    {leading}
                </Text>
            )}
            <input
                className={cn(CONTROL_TEXT, 'px-4')}
                {...props}
            />
        </ControlFrame>
    )
}
