import { Accordion } from '~/components/ui/accordion'
import { EmojiChip } from '~/components/ui/emoji-chip'
import { Text } from '~/components/ui/text'
import { sectionTitleId } from '~/data/layout/landmarks'
import type { FaqGroup as FaqGroupContent } from '~/types/content'

export interface FaqGroupProps {
    group: FaqGroupContent
}

export function FaqGroup({ group: { id, title, emoji, tone, items } }: FaqGroupProps) {
    return (
        <section
            id={id}
            aria-labelledby={sectionTitleId(id)}
            className='scroll-mt-24 space-y-5'>
            <div className='flex items-center gap-4'>
                <EmojiChip
                    emoji={emoji}
                    tone={tone}
                />
                <Text
                    as='h2'
                    id={sectionTitleId(id)}
                    variant='heading'>
                    {title}
                </Text>
            </div>
            <Accordion items={items} />
        </section>
    )
}
