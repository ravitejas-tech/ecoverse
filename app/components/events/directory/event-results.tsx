import { EventCard } from '~/components/events/event-card'
import { Button } from '~/components/ui/button'
import { EmptyState } from '~/components/ui/empty-state'
import { Text } from '~/components/ui/text'
import { WhatsAppLink } from '~/components/ui/whatsapp-link'
import { WHATSAPP_MESSAGES } from '~/data/contact'
import { DIRECTORY_EMPTY, DIRECTORY_RESULTS } from '~/data/events/directory'
import type { EventSummary, EventWhen } from '~/types/events'

export interface EventResultsProps {
    events: EventSummary[]
    when: EventWhen
    filtered: boolean
    onReset: () => void
}

export function EventResults({ events, when, filtered, onReset }: EventResultsProps) {
    if (events.length === 0) {
        const askUs = !filtered && when === 'upcoming'
        return (
            <EmptyState
                {...(filtered ? DIRECTORY_EMPTY.filtered : DIRECTORY_EMPTY[when])}
                tone={filtered ? 'cyan' : 'yellow'}
                action={
                    askUs ? (
                        <Button asChild>
                            <WhatsAppLink message={WHATSAPP_MESSAGES.help}>{DIRECTORY_EMPTY.askNext}</WhatsAppLink>
                        </Button>
                    ) : (
                        <Button
                            type='button'
                            onClick={onReset}>
                            {filtered ? DIRECTORY_EMPTY.clear : DIRECTORY_EMPTY.seeUpcoming}
                        </Button>
                    )
                }
            />
        )
    }

    return (
        <div className='space-y-5'>
            <Text
                as='h2'
                variant='label'
                tone='secondary'
                aria-live='polite'>
                {DIRECTORY_RESULTS.count(events.length, when)}
            </Text>
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8'>
                {events.map((event, index) => (
                    <EventCard
                        key={event.slug}
                        event={event}
                        priority={index === 0}
                    />
                ))}
            </div>
        </div>
    )
}
