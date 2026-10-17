import { cva } from 'class-variance-authority'
import { Text } from '~/components/ui/text'
import { POP_FILLS, type PopTone } from '~/data/ui/pop-tones'
import { cn } from '~/lib/utils'

const badgeVariants = cva(
    'inline-flex items-center gap-1 rounded-full border-2 border-border px-2.5 py-0.5 whitespace-nowrap',
    {
        variants: { tone: { surface: 'bg-surface', muted: 'bg-surface-muted', ...POP_FILLS } },
    },
)

export interface BadgeProps {
    children: string
    tone?: PopTone | 'surface' | 'muted'
    className?: string
}

export function Badge({ children, tone = 'surface', className }: BadgeProps) {
    return (
        <span className={cn(badgeVariants({ tone }), className)}>
            <Text
                as='span'
                variant='sticker'
                tone={tone === 'surface' || tone === 'muted' ? 'primary' : 'on-pop'}>
                {children}
            </Text>
        </span>
    )
}
