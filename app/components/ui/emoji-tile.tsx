import { Link } from 'react-router'
import { cva } from 'class-variance-authority'
import { EmojiChip } from '~/components/ui/emoji-chip'
import { PopCard } from '~/components/ui/pop-card'
import { Text } from '~/components/ui/text'
import type { PopTone } from '~/data/ui/pop-tones'
import type { Tilt } from '~/data/ui/tilts'

export interface EmojiTileProps {
    title: string
    emoji: string
    caption: string
    tone: PopTone
    tilt: Tilt
    to?: string
}

const emojiTileVariants = cva(
    'flex h-full flex-col items-start gap-3 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-6',
    { variants: { linked: { true: 'focus-visible:ring-4 focus-visible:ring-pop-cyan focus-visible:outline-none' } } },
)

export function EmojiTile({ title, emoji, caption, tone, tilt, to }: EmojiTileProps) {
    const content = (
        <>
            <EmojiChip emoji={emoji} />
            <div className='space-y-1'>
                <Text
                    as='h3'
                    variant='title'
                    tone='on-pop'>
                    {title}
                </Text>
                <Text
                    variant='marker'
                    tone='on-pop'>
                    {caption}
                </Text>
            </div>
        </>
    )

    return to ? (
        <PopCard
            asChild
            tone={tone}
            tilt={tilt}
            interactive
            className={emojiTileVariants({ linked: true })}>
            <Link to={to}>{content}</Link>
        </PopCard>
    ) : (
        <PopCard
            tone={tone}
            tilt={tilt}
            className={emojiTileVariants()}>
            {content}
        </PopCard>
    )
}
