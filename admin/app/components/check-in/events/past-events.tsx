import { ChevronDown } from 'lucide-react'
import { CheckInEventCard } from '~/components/check-in/events/event-card'
import { PopCard } from '~/components/ui/pop-card'
import { Text } from '~/components/ui/text'
import { CHECK_IN_COPY } from '~/data/check-in/copy'
import type { CheckInEvent } from '~/types/check-in'

export function PastEvents({ events }: { events: CheckInEvent[] }) {
    if (events.length === 0) return null

    return (
        <details className='group'>
            <PopCard
                asChild
                className='flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4'>
                <summary>
                    <Text
                        as='span'
                        variant='title'>
                        {CHECK_IN_COPY.events.past(events.length)}
                    </Text>
                    <ChevronDown
                        className='size-5 shrink-0 transition group-open:rotate-180'
                        aria-hidden
                    />
                </summary>
            </PopCard>
            <div className='mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
                {events.map((event) => (
                    <CheckInEventCard
                        key={event.id}
                        event={event}
                        primary={false}
                    />
                ))}
            </div>
        </details>
    )
}
