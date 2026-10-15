import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { POP_FILLS } from '~/data/ui/pop-tones'
import { TILTS } from '~/data/ui/tilts'
import { cn } from '~/lib/utils'

const chipVariants = cva('grid shrink-0 place-items-center border-2 border-border shadow-pop-sm transition', {
    variants: {
        size: { sm: 'size-10 rounded-xl', md: 'size-16 rounded-2xl' },
        tone: { surface: 'bg-surface', ...POP_FILLS },
        tilt: TILTS,
    },
    defaultVariants: { size: 'md', tone: 'surface', tilt: 'none' },
})

export interface ChipProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof chipVariants> {}

export function Chip({ size, tone, tilt, className, ...props }: ChipProps) {
    return (
        <span
            className={cn(chipVariants({ size, tone, tilt }), className)}
            {...props}
        />
    )
}
