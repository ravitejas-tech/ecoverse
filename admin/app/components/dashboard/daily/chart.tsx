import { DailyBar } from '~/components/dashboard/daily/bar'
import { Panel } from '~/components/ui/panel'
import { Text } from '~/components/ui/text'
import { DASHBOARD_COPY } from '~/data/dashboard/copy'
import { DAILY_LABEL_STEP } from '~/data/dashboard/daily'
import { formatRupees } from '~/lib/format'
import type { DashboardDay } from '~/types/dashboard'

const { daily, orderCount } = DASHBOARD_COPY

export interface DailyChartProps {
    days: DashboardDay[]
    className?: string
}

export function DailyChart({ days, className }: DailyChartProps) {
    const peak = Math.max(0, ...days.map(({ orders }) => orders))
    const peakIndex = days.findIndex(({ orders }) => orders === peak)
    const orders = days.reduce((sum, day) => sum + day.orders, 0)
    const revenue = days.reduce((sum, day) => sum + day.revenue, 0)

    return (
        <Panel
            title={daily.title}
            className={className}
            action={
                peak > 0 && (
                    <Text
                        variant='small'
                        tone='secondary'>
                        {daily.total(orderCount(orders), formatRupees(revenue))}
                    </Text>
                )
            }>
            {peak === 0 ? (
                <Text tone='secondary'>{daily.empty}</Text>
            ) : (
                <ul
                    aria-label={daily.listLabel}
                    className='flex pt-6'>
                    {days.map((day, index) => (
                        <DailyBar
                            key={day.day}
                            day={day}
                            peak={peak}
                            isPeak={index === peakIndex}
                            showLabel={(days.length - 1 - index) % DAILY_LABEL_STEP === 0}
                            alignEnd={index >= days.length / 2}
                        />
                    ))}
                </ul>
            )}
        </Panel>
    )
}
