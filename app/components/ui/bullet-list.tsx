import { Chip } from '~/components/ui/chip'
import { Text } from '~/components/ui/text'
import { BULLETS, type Bullet } from '~/data/ui/bullets'

export interface BulletListProps {
    items: string[]
    bullet: Bullet
}

export function BulletList({ items, bullet }: BulletListProps) {
    const { icon: Icon, tone } = BULLETS[bullet]

    return (
        <ul className='space-y-3'>
            {items.map((item) => (
                <li
                    key={item}
                    className='flex items-start gap-3'>
                    <Chip
                        size='xs'
                        tone={tone}
                        aria-hidden>
                        <Icon strokeWidth={3} />
                    </Chip>
                    <Text
                        as='span'
                        className='pt-0.5'>
                        {item}
                    </Text>
                </li>
            ))}
        </ul>
    )
}
