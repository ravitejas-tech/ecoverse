import type { CSSProperties, HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

export interface RevealProps extends HTMLAttributes<HTMLDivElement> {
    order?: number
}

export function Reveal({ order = 0, className, style, ...props }: RevealProps) {
    return (
        <div
            className={cn('motion-safe:animate-reveal', className)}
            style={{ ...style, '--reveal-order': order } as CSSProperties}
            {...props}
        />
    )
}
