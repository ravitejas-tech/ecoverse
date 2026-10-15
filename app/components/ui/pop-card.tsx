import type { HTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { POP_FILLS } from '~/data/ui/pop-tones'
import { TILTS } from '~/data/ui/tilts'
import { cn } from '~/lib/utils'

const popCardVariants = cva('rounded-3xl border-2 border-border shadow-pop', {
    variants: {
        tone: { surface: 'bg-surface', ...POP_FILLS },
        tilt: TILTS,
        flatOnPhone: {
            true: 'max-sm:rounded-none max-sm:border-0 max-sm:bg-transparent max-sm:shadow-none',
        },
        interactive: {
            true: 'transition hover:-translate-y-1.5 hover:rotate-0 hover:shadow-pop-lg motion-reduce:hover:translate-y-0',
        },
    },
    defaultVariants: { tone: 'surface', tilt: 'none' },
})

export interface PopCardProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof popCardVariants> {
    asChild?: boolean
}

export function PopCard({ tone, tilt, flatOnPhone, interactive, asChild = false, className, ...props }: PopCardProps) {
    const Component = asChild ? Slot : 'div'
    return (
        <Component
            className={cn(popCardVariants({ tone, tilt, flatOnPhone, interactive }), className)}
            {...props}
        />
    )
}
