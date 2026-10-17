import { cva } from 'class-variance-authority'
import { Text } from '~/components/ui/text'
import { POP_FILLS, type PopTone } from '~/data/ui/pop-tones'
import { TILTS, type Tilt } from '~/data/ui/tilts'
import { cn } from '~/lib/utils'

const stickerVariants = cva(
    'inline-flex items-center gap-1.5 rounded-full border-2 border-border px-3 py-1 whitespace-nowrap shadow-pop-sm',
    { variants: { tone: POP_FILLS, tilt: TILTS } },
)

export interface StickerProps {
    children: string
    tone?: PopTone
    tilt?: Tilt
    className?: string
}

export function Sticker({ children, tone = 'yellow', tilt = 'none', className }: StickerProps) {
    return (
        <span className={cn(stickerVariants({ tone, tilt }), className)}>
            <Text
                as='span'
                variant='sticker'
                tone='on-pop'>
                {children}
            </Text>
        </span>
    )
}
