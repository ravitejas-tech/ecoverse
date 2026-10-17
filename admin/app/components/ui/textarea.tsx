import type { Ref, TextareaHTMLAttributes } from 'react'
import { CONTROL_CLASS } from '~/data/ui/control'
import { cn } from '~/lib/utils'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    ref?: Ref<HTMLTextAreaElement>
}

export function Textarea({ className, rows = 4, ...props }: TextareaProps) {
    return (
        <textarea
            rows={rows}
            className={cn(CONTROL_CLASS, 'py-3 leading-6', className)}
            {...props}
        />
    )
}
