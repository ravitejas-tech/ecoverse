import { EmojiChip } from '~/components/ui/emoji-chip'
import { PopCard } from '~/components/ui/pop-card'
import { Text } from '~/components/ui/text'
import type { Tilt } from '~/data/ui/tilts'
import type { Experience } from '~/types/landing'

export interface ExperienceTileProps {
    experience: Experience
    tilt: Tilt
}

export function ExperienceTile({ experience: { title, emoji, caption, tone }, tilt }: ExperienceTileProps) {
    return (
        <PopCard
            tone={tone}
            tilt={tilt}
            interactive
            className='flex h-full flex-col items-start gap-3 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-6'>
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
        </PopCard>
    )
}
