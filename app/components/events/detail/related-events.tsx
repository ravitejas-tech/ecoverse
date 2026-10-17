import { EventCard } from '~/components/events/event-card'
import { Reveal } from '~/components/ui/reveal'
import { Section } from '~/components/ui/section'
import { SectionHeading } from '~/components/ui/section-heading'
import { SwipeGrid } from '~/components/ui/swipe-grid'
import { RELATED_HEADING } from '~/data/events/page'
import type { EventSummary } from '~/types/events'

export interface RelatedEventsProps {
    events: EventSummary[]
}

export function RelatedEvents({ events }: RelatedEventsProps) {
    return (
        <Section
            id={RELATED_HEADING.id}
            surface='muted'>
            <SectionHeading
                sectionId={RELATED_HEADING.id}
                eyebrow={RELATED_HEADING.eyebrow}
                title={RELATED_HEADING.title}
                tone='cyan'
            />
            <SwipeGrid>
                {events.map((event, index) => (
                    <Reveal
                        key={event.slug}
                        order={index}
                        className='h-full'>
                        <EventCard event={event} />
                    </Reveal>
                ))}
            </SwipeGrid>
        </Section>
    )
}
