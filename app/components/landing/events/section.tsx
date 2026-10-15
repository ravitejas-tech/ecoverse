import { EventCard } from '~/components/landing/events/event-card'
import { SectionHeading } from '~/components/landing/section-heading'
import { Reveal } from '~/components/ui/reveal'
import { Section } from '~/components/ui/section'
import { SwipeGrid } from '~/components/ui/swipe-grid'
import { EVENTS_HEADING, UPCOMING_EVENTS } from '~/data/landing/events'
import { SECTION_IDS } from '~/data/navigation'

export function EventsSection() {
    return (
        <Section
            id={SECTION_IDS.events}
            className='pt-24 md:pt-36'>
            <SectionHeading
                sectionId={SECTION_IDS.events}
                {...EVENTS_HEADING}
                tone='pink'
            />
            <SwipeGrid>
                {UPCOMING_EVENTS.map((event, index) => (
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
