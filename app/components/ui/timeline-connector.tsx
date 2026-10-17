import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const timelineConnectorVariants = cva('absolute bottom-1 -translate-x-1/2 border-l-2 border-dashed border-border', {
    variants: { chip: { sm: 'top-11 left-5', md: 'top-18 left-8' } },
    defaultVariants: { chip: 'md' },
})

export interface TimelineConnectorProps extends VariantProps<typeof timelineConnectorVariants> {
    className?: string
}

export function TimelineConnector({ chip, className }: TimelineConnectorProps) {
    return (
        <span
            className={cn(timelineConnectorVariants({ chip }), className)}
            aria-hidden
        />
    )
}
