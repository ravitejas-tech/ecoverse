import { BackLink } from '~/components/ui/back-link'
import { ProgressBar } from '~/components/ui/progress-bar'
import { Text } from '~/components/ui/text'
import { CHECK_IN_COPY } from '~/data/check-in/copy'
import { CHECK_IN_PATH } from '~/data/check-in/scanner'
import { formatEventDay, formatEventTime } from '~/lib/format'
import type { Tables } from '~/types/database'

const { scanner } = CHECK_IN_COPY

export interface ScannerHeaderProps {
    event: Pick<Tables<'events'>, 'title' | 'starts_at' | 'venue_name' | 'city'>
    checkedIn: number
    tickets: number
}

export function ScannerHeader({ event, checkedIn, tickets }: ScannerHeaderProps) {
    return (
        <header className='space-y-3'>
            <BackLink
                to={CHECK_IN_PATH}
                label={scanner.back}
            />
            <div className='flex items-end justify-between gap-4'>
                <div className='min-w-0 space-y-1'>
                    <Text
                        as='h1'
                        variant='display'>
                        {event.title}
                    </Text>
                    <Text
                        tone='secondary'
                        className='hidden sm:block'>
                        {`${formatEventDay(event.starts_at)} · ${formatEventTime(event.starts_at)} · ${event.venue_name || event.city}`}
                    </Text>
                </div>
                <Text
                    variant='stat'
                    aria-live='polite'
                    className='shrink-0 whitespace-nowrap'>
                    {scanner.counter(checkedIn, tickets)}
                </Text>
            </div>
            <ProgressBar
                value={checkedIn}
                max={tickets}
                label={scanner.counterLabel}
                size='sm'
            />
        </header>
    )
}
