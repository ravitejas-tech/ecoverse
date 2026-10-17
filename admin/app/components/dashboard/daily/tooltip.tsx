import { PopCard } from '~/components/ui/pop-card'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

export interface DailyTooltipProps {
    date: string
    summary: string
    alignEnd: boolean
}

export function DailyTooltip({ date, summary, alignEnd }: DailyTooltipProps) {
    return (
        <PopCard
            aria-hidden
            className={cn(
                'pointer-events-none absolute bottom-full z-10 mb-2 hidden px-3 py-2 whitespace-nowrap group-hover:block group-focus-visible:block',
                alignEnd ? 'right-0' : 'left-0',
            )}>
            <Text variant='meta'>{date}</Text>
            <Text variant='label'>{summary}</Text>
        </PopCard>
    )
}
