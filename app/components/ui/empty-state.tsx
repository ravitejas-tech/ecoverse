import type { ReactNode } from 'react'
import { EmojiChip } from '~/components/ui/emoji-chip'
import { PopCard } from '~/components/ui/pop-card'
import { Text } from '~/components/ui/text'
import type { PopTone } from '~/data/ui/pop-tones'

export interface EmptyStateProps {
    emoji: string
    title: string
    body: string
    tone?: PopTone
    level?: 'h1' | 'h2'
    action?: ReactNode
}

export function EmptyState({ emoji, title, body, tone = 'yellow', level = 'h2', action }: EmptyStateProps) {
    return (
        <PopCard className='flex flex-col items-center gap-4 px-6 py-12 text-center sm:py-16'>
            <EmojiChip
                emoji={emoji}
                tone={tone}
            />
            <Text
                as={level}
                variant='heading'>
                {title}
            </Text>
            <Text
                tone='secondary'
                className='max-w-md'>
                {body}
            </Text>
            {action}
        </PopCard>
    )
}
