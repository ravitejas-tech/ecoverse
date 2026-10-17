import { DetailBlock } from '~/components/events/detail/info/detail-block'
import { BulletList } from '~/components/ui/bullet-list'
import { FactRow } from '~/components/ui/fact-row'
import { Text } from '~/components/ui/text'
import { EVENT_FACTS, EVENT_SECTIONS } from '~/data/events/page'
import type { Bullet } from '~/data/ui/bullets'
import type { EventDetail } from '~/types/events'

export interface GoodToKnowProps {
    event: Pick<EventDetail, 'ageLimit' | 'language' | 'dressCode' | 'included' | 'notIncluded' | 'thingsToKnow'>
}

export function GoodToKnow({ event }: GoodToKnowProps) {
    const facts = [
        { ...EVENT_FACTS.age, value: event.ageLimit },
        { ...EVENT_FACTS.language, value: event.language },
        { ...EVENT_FACTS.dressCode, value: event.dressCode },
    ].filter(({ value }) => value)
    const lists: { title: string; items: string[]; bullet: Bullet }[] = [
        { title: EVENT_SECTIONS.included, items: event.included, bullet: 'check' },
        { title: EVENT_SECTIONS.notIncluded, items: event.notIncluded, bullet: 'cross' },
        { title: EVENT_SECTIONS.thingsToKnow, items: event.thingsToKnow, bullet: 'info' },
    ]

    return (
        <DetailBlock title={EVENT_SECTIONS.goodToKnow}>
            {facts.length > 0 && (
                <div className='grid gap-5 sm:grid-cols-3'>
                    {facts.map((fact) => (
                        <FactRow
                            key={fact.label}
                            {...fact}
                        />
                    ))}
                </div>
            )}
            <div className='grid gap-8 pt-2 sm:grid-cols-2'>
                {lists
                    .filter(({ items }) => items.length > 0)
                    .map(({ title, items, bullet }) => (
                        <div
                            key={title}
                            className='space-y-4'>
                            <Text
                                as='h3'
                                variant='subtitle'>
                                {title}
                            </Text>
                            <BulletList
                                items={items}
                                bullet={bullet}
                            />
                        </div>
                    ))}
            </div>
        </DetailBlock>
    )
}
