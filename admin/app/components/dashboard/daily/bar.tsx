import { DailyTooltip } from '~/components/dashboard/daily/tooltip'
import { Text } from '~/components/ui/text'
import { DASHBOARD_COPY } from '~/data/dashboard/copy'
import { formatCount, formatRupees, formatShortDay } from '~/lib/format'
import { cn } from '~/lib/utils'
import type { DashboardDay } from '~/types/dashboard'

const { daily, orderCount } = DASHBOARD_COPY

export interface DailyBarProps {
    day: DashboardDay
    peak: number
    isPeak: boolean
    showLabel: boolean
    alignEnd: boolean
}

export function DailyBar({ day: { day, orders, revenue }, peak, isPeak, showLabel, alignEnd }: DailyBarProps) {
    const date = formatShortDay(day)
    const count = orderCount(orders)
    const money = formatRupees(revenue)

    return (
        <li
            tabIndex={0}
            className='group relative min-w-0 flex-1 rounded-md focus-visible:ring-4 focus-visible:ring-pop-cyan focus-visible:outline-none'>
            <Text
                as='span'
                variant='inherit'
                className='sr-only'>
                {daily.bar(date, count, money)}
            </Text>
            <div
                aria-hidden
                className='flex h-40 items-end justify-center border-b-2 border-border sm:h-48'>
                {orders > 0 && (
                    <div
                        className='relative min-h-1.5 w-3/4 max-w-6 rounded-t-md border-2 border-b-0 border-border bg-pop-cyan transition-colors group-hover:bg-pop-yellow group-focus-visible:bg-pop-yellow'
                        style={{ height: `${(orders / peak) * 100}%` }}>
                        {isPeak && (
                            <Text
                                as='span'
                                variant='meta'
                                className='absolute bottom-full left-1/2 mb-1 -translate-x-1/2'>
                                {formatCount(orders)}
                            </Text>
                        )}
                    </div>
                )}
            </div>
            <Text
                as='span'
                variant='meta'
                aria-hidden
                className={cn('mt-2 flex justify-center whitespace-nowrap', !showLabel && 'invisible')}>
                {date}
            </Text>
            <DailyTooltip
                date={date}
                summary={daily.total(count, money)}
                alignEnd={alignEnd}
            />
        </li>
    )
}
