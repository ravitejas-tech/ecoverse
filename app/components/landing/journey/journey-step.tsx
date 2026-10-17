import { EmojiChip } from '~/components/ui/emoji-chip'
import { PopCard } from '~/components/ui/pop-card'
import { Sticker } from '~/components/ui/sticker'
import { Text } from '~/components/ui/text'
import { TimelineConnector } from '~/components/ui/timeline-connector'
import { cn } from '~/lib/utils'
import type { JourneyStep as JourneyStepContent } from '~/types/landing'

export interface JourneyStepProps {
    step: JourneyStepContent
    number: string
    last: boolean
}

export function JourneyStep({ step: { title, emoji, body, tone }, number, last }: JourneyStepProps) {
    return (
        <PopCard
            flatOnPhone
            className={cn('relative flex h-full gap-5 sm:flex-col sm:gap-4 sm:p-6 sm:pt-8', !last && 'pb-8')}>
            {!last && <TimelineConnector className='sm:hidden' />}
            <Sticker
                tone={tone}
                tilt='hard-left'
                className='absolute -top-4 left-5 hidden sm:inline-flex'>
                {number}
            </Sticker>
            <EmojiChip
                emoji={emoji}
                tone={tone}
            />
            <div className='space-y-1.5 pt-2 sm:space-y-3 sm:pt-0'>
                <Text
                    as='h3'
                    variant='title'>
                    {title}
                </Text>
                <Text
                    variant='small'
                    tone='secondary'>
                    {body}
                </Text>
            </div>
        </PopCard>
    )
}
