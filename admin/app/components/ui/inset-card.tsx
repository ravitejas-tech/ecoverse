import type { HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

export function InsetCard({ className, ...props }: HTMLAttributes<HTMLLIElement>) {
    return (
        <li
            className={cn('rounded-xl border-2 border-border bg-surface-muted p-3 sm:p-4', className)}
            {...props}
        />
    )
}
