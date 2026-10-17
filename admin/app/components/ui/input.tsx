import type { InputHTMLAttributes, Ref } from 'react'
import { CONTROL_CLASS } from '~/data/ui/control'
import { cn } from '~/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    ref?: Ref<HTMLInputElement>
}

export function Input({ className, ...props }: InputProps) {
    return (
        <input
            className={cn(CONTROL_CLASS, 'h-12', className)}
            {...props}
        />
    )
}
