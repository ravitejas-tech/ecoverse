import { Chip, type ChipProps } from '~/components/ui/chip'
import { Text } from '~/components/ui/text'

export interface EmojiChipProps extends Pick<ChipProps, 'tone' | 'className'> {
    emoji: string
}

export function EmojiChip({ emoji, tone, className }: EmojiChipProps) {
    return (
        <Chip
            tone={tone}
            className={className}
            aria-hidden>
            <Text
                as='span'
                variant='emoji'>
                {emoji}
            </Text>
        </Chip>
    )
}
