import { DetailBlock } from '~/components/events/detail/info/detail-block'
import { BulletList } from '~/components/ui/bullet-list'
import { Text } from '~/components/ui/text'
import type { EventDetail } from '~/types/events'

export interface AboutBlockProps {
    title: string
    event: Pick<EventDetail, 'about' | 'highlights'>
}

export function AboutBlock({ title, event: { about, highlights } }: AboutBlockProps) {
    return (
        <DetailBlock title={title}>
            <div className='max-w-3xl space-y-4'>
                {about.map((paragraph) => (
                    <Text
                        key={paragraph}
                        tone='secondary'>
                        {paragraph}
                    </Text>
                ))}
            </div>
            {highlights.length > 0 && (
                <BulletList
                    items={highlights}
                    bullet='sparkle'
                />
            )}
        </DetailBlock>
    )
}
