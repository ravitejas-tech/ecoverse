import type { HTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { POP_FILLS } from '~/data/ui/pop-tones'
import { TILTS } from '~/data/ui/tilts'
import { cn } from '~/lib/utils'

const popCardVariants = cva('rounded-2xl border-2 border-border shadow-pop-sm', {
    variants: {
        tone: { surface: 'bg-surface', ...POP_FILLS },
        tilt: TILTS,
        padding: { none: '', md: 'p-5 sm:p-6' },
        interactive: {
            true: 'transition hover:-translate-y-0.5 hover:shadow-pop motion-reduce:hover:translate-y-0',
        },
    },
    defaultVariants: { tone: 'surface', tilt: 'none', padding: 'none' },
})

export interface PopCardProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof popCardVariants> {
    asChild?: boolean
}

export function PopCard({ tone, tilt, padding, interactive, asChild = false, className, ...props }: PopCardProps) {
    const Component = asChild ? Slot : 'div'
    return (
        <Component
            className={cn(popCardVariants({ tone, tilt, padding, interactive }), className)}
            {...props}
        />
    )
}
