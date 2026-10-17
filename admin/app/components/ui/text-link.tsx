import type { AnchorHTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

export function TextLink({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
    return (
        <a
            className={cn('font-semibold break-all text-accent-text underline-offset-4 hover:underline', className)}
            {...props}
        />
    )
}
