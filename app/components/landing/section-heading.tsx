import { Sticker } from '~/components/ui/sticker'
import { Text } from '~/components/ui/text'
import { sectionTitleId } from '~/data/layout/landmarks'
import type { PopTone } from '~/data/ui/pop-tones'
import { cn } from '~/lib/utils'

export interface SectionHeadingProps {
    sectionId: string
    eyebrow: string
    title: string
    scrawl?: string
    tone?: PopTone
    centered?: boolean
}

export function SectionHeading({
    sectionId,
    eyebrow,
    title,
    scrawl,
    tone = 'yellow',
    centered = false,
}: SectionHeadingProps) {
    return (
        <div className={cn('mb-8 max-w-3xl space-y-4 md:mb-16 md:space-y-5', centered && 'sm:mx-auto sm:text-center')}>
            <Sticker
                tone={tone}
                tilt='left'>
                {eyebrow}
            </Sticker>
            <Text
                as='h2'
                id={sectionTitleId(sectionId)}
                variant='display'>
                {title}
            </Text>
            {scrawl && (
                <Text
                    variant='marker'
                    tone='accent'>
                    {scrawl}
                </Text>
            )}
        </div>
    )
}
