import { Clock } from 'lucide-react'
import { DetailBlock } from '~/components/events/detail/info/detail-block'
import { Chip } from '~/components/ui/chip'
import { Text } from '~/components/ui/text'
import { TimelineConnector } from '~/components/ui/timeline-connector'
import { EVENT_SECTIONS } from '~/data/events/page'
import type { PopTone } from '~/data/ui/pop-tones'
import { cn } from '~/lib/utils'
import type { ScheduleItem } from '~/types/events'

export interface ScheduleTimelineProps {
    schedule: ScheduleItem[]
    tone: PopTone
}

export function ScheduleTimeline({ schedule, tone }: ScheduleTimelineProps) {
    return (
        <DetailBlock title={EVENT_SECTIONS.schedule}>
            <ol>
                {schedule.map(({ time, title }, index) => {
                    const last = index === schedule.length - 1
                    return (
                        <li
                            key={`${time}-${title}`}
                            className={cn('relative flex gap-4', !last && 'pb-7')}>
                            {!last && <TimelineConnector chip='sm' />}
                            <Chip
                                size='sm'
                                tone={tone}
                                aria-hidden>
                                <Clock />
                            </Chip>
                            <div className='space-y-0.5 pt-0.5'>
                                <Text variant='meta'>{time}</Text>
                                <Text variant='subtitle'>{title}</Text>
                            </div>
                        </li>
                    )
                })}
            </ol>
        </DetailBlock>
    )
}
