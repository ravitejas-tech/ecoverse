import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { EventCard } from '~/components/events/event-card'
import { Button } from '~/components/ui/button'
import { ButtonRow } from '~/components/ui/button-row'
import { EmptyState } from '~/components/ui/empty-state'
import { Reveal } from '~/components/ui/reveal'
import { Section } from '~/components/ui/section'
import { SectionHeading } from '~/components/ui/section-heading'
import { SwipeGrid } from '~/components/ui/swipe-grid'
import { WhatsAppLink } from '~/components/ui/whatsapp-link'
import { WHATSAPP_MESSAGES } from '~/data/contact'
import { EVENTS_HEADING, HOME_EVENTS_EMPTY, HOME_EVENTS_MORE } from '~/data/landing/events'
import { PATHS, SECTION_IDS } from '~/data/navigation'
import type { EventSummary } from '~/types/events'

export interface EventsSectionProps {
    events: EventSummary[]
}

export function EventsSection({ events }: EventsSectionProps) {
    return (
        <Section
            id={SECTION_IDS.events}
            className='pt-24 md:pt-36'>
            <SectionHeading
                sectionId={SECTION_IDS.events}
                {...EVENTS_HEADING}
                tone='pink'
            />
            {events.length > 0 ? (
                <>
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
                    <ButtonRow
                        align='center'
                        className='mt-4 sm:mt-12'>
                        <Button
                            asChild
                            size='lg'
                            variant='secondary'>
                            <Link to={PATHS.events}>
                                {HOME_EVENTS_MORE}
                                <ArrowRight aria-hidden />
                            </Link>
                        </Button>
                    </ButtonRow>
                </>
            ) : (
                <EmptyState
                    emoji={HOME_EVENTS_EMPTY.emoji}
                    title={HOME_EVENTS_EMPTY.title}
                    body={HOME_EVENTS_EMPTY.body}
                    action={
                        <Button asChild>
                            <WhatsAppLink message={WHATSAPP_MESSAGES.help}>{HOME_EVENTS_EMPTY.action}</WhatsAppLink>
                        </Button>
                    }
                />
            )}
        </Section>
    )
}
