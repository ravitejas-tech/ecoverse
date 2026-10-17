import { DividedList } from '~/components/ui/divided-list'
import { EmptyState } from '~/components/ui/empty-state'
import { PopCard } from '~/components/ui/pop-card'
import { Text } from '~/components/ui/text'
import { ACTIVITY_COPY } from '~/data/activity/copy'
import { formatDateTime } from '~/lib/format'
import type { ActivityItem } from '~/types/activity'

export function ActivityList({ items }: { items: ActivityItem[] }) {
    if (items.length === 0) return <EmptyState {...ACTIVITY_COPY.empty} />

    return (
        <PopCard asChild>
            <DividedList
                ordered
                aria-label={ACTIVITY_COPY.caption}>
                {items.map(({ id, actor, sentence, createdAt }) => (
                    <li
                        key={id}
                        className='flex flex-col gap-1 px-4 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:px-5'>
                        <Text className='min-w-0 break-words'>
                            <Text
                                as='strong'
                                variant='strong'>
                                {actor}
                            </Text>{' '}
                            {sentence}
                        </Text>
                        <Text
                            as='span'
                            variant='small'
                            tone='muted'
                            className='shrink-0'>
                            <time dateTime={createdAt}>{formatDateTime(createdAt)}</time>
                        </Text>
                    </li>
                ))}
            </DividedList>
        </PopCard>
    )
}
