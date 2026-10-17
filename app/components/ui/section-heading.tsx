import { Sticker } from '~/components/ui/sticker'
import { Text } from '~/components/ui/text'
import { sectionTitleId } from '~/data/layout/landmarks'
import type { PopTone } from '~/data/ui/pop-tones'
import { cn } from '~/lib/utils'

export interface SectionHeadingProps {
    sectionId?: string
    level?: 'h1' | 'h2'
    eyebrow: string
    title: string
    lead?: string
    scrawl?: string
    tone?: PopTone
    centered?: boolean
    className?: string
}

export function SectionHeading({
    sectionId,
    level = 'h2',
    eyebrow,
    title,
    lead,
    scrawl,
    tone = 'yellow',
    centered = false,
    className,
}: SectionHeadingProps) {
    return (
        <div
            className={cn(
                'mb-8 max-w-3xl space-y-4 md:mb-16 md:space-y-5',
                centered && 'sm:mx-auto sm:text-center',
                className,
            )}>
            <Sticker
                tone={tone}
                tilt='left'>
                {eyebrow}
            </Sticker>
            <Text
                as={level}
                id={sectionId && sectionTitleId(sectionId)}
                variant='display'>
                {title}
            </Text>
            {lead && (
                <Text
                    variant='lead'
                    tone='secondary'>
                    {lead}
                </Text>
            )}
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
