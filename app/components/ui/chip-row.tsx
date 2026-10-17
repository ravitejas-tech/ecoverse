import type { HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

export function ChipRow({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                '-mx-5 flex gap-2 overflow-x-auto px-5 pt-1 pb-2 scrollbar-none sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0',
                className,
            )}
            {...props}
        />
    )
}
