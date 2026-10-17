import { ScanLine } from 'lucide-react'
import { Link } from 'react-router'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { PopCard } from '~/components/ui/pop-card'
import { ProgressBar } from '~/components/ui/progress-bar'
import { Text } from '~/components/ui/text'
import { CHECK_IN_COPY } from '~/data/check-in/copy'
import { CHECK_IN_PATH } from '~/data/check-in/scanner'
import { formatEventDay, formatEventTime } from '~/lib/format'
import type { CheckInEvent } from '~/types/check-in'

const { events: copy } = CHECK_IN_COPY

export interface CheckInEventCardProps {
    event: CheckInEvent
    today?: boolean
    primary?: boolean
}

export function CheckInEventCard({ event, today = false, primary = true }: CheckInEventCardProps) {
    return (
        <PopCard
            asChild
            padding='md'
            className='flex flex-col gap-4'>
            <article>
                <div className='space-y-2'>
                    {today && <Badge tone='lime'>{copy.today}</Badge>}
                    <Text
                        as='h2'
                        variant='heading'>
                        {event.title}
                    </Text>
                    <Text tone='secondary'>
                        <time dateTime={event.starts_at}>
                            {formatEventDay(event.starts_at)} · {formatEventTime(event.starts_at)}
                        </time>
                        {` · ${event.venue_name || event.city}`}
                    </Text>
                </div>
                <div className='space-y-2'>
                    <ProgressBar
                        value={event.checkedIn}
                        max={event.tickets}
                        label={copy.progressLabel}
                    />
                    <Text variant='label'>{copy.progress(event.checkedIn, event.tickets)}</Text>
                </div>
                <Button
                    asChild
                    size='lg'
                    variant={primary ? 'primary' : 'secondary'}
                    className='w-full sm:mt-auto'>
                    <Link to={`${CHECK_IN_PATH}/${event.id}`}>
                        <ScanLine />
                        {copy.start}
                    </Link>
                </Button>
            </article>
        </PopCard>
    )
}
