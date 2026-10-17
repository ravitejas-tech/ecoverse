import type { HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

export interface DividedListProps extends HTMLAttributes<HTMLUListElement> {
    ordered?: boolean
}

export function DividedList({ ordered = false, className, ...props }: DividedListProps) {
    const List = ordered ? 'ol' : 'ul'
    return (
        <List
            className={cn('divide-y-2 divide-border', className)}
            {...props}
        />
    )
}
