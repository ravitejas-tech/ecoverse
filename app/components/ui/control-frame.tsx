import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const controlFrameVariants = cva(
    'relative flex h-12 items-center overflow-hidden rounded-2xl border-2 bg-surface shadow-pop-sm transition focus-within:ring-4 focus-within:ring-pop-cyan',
    {
        variants: { invalid: { true: 'border-accent-text', false: 'border-border' } },
        defaultVariants: { invalid: false },
    },
)

export interface ControlFrameProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof controlFrameVariants> {}

export function ControlFrame({ invalid, className, ...props }: ControlFrameProps) {
    return (
        <div
            className={cn(controlFrameVariants({ invalid }), className)}
            {...props}
        />
    )
}
