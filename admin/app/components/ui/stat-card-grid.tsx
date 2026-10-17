import { StatCard } from '~/components/ui/stat-card'
import type { StatCardConfig } from '~/types/stat-card'

export interface StatCardGridProps<Source> {
    cards: readonly StatCardConfig<Source>[]
    source: Source
}

export function StatCardGrid<Source>({ cards, source }: StatCardGridProps<Source>) {
    return (
        <div className='grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4'>
            {cards.map(({ key, value, hint, ...card }) => (
                <StatCard
                    key={key}
                    {...card}
                    value={value(source)}
                    hint={hint?.(source)}
                />
            ))}
        </div>
    )
}
