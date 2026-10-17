import { AboutBlock } from '~/components/events/detail/info/about-block'
import { DetailBlock } from '~/components/events/detail/info/detail-block'
import { GoodToKnow } from '~/components/events/detail/info/good-to-know'
import { HostList } from '~/components/events/detail/info/host-list'
import { OrganizerCard } from '~/components/events/detail/info/organizer-card'
import { Policies } from '~/components/events/detail/info/policies'
import { ScheduleTimeline } from '~/components/events/detail/info/schedule-timeline'
import { TicketList } from '~/components/events/detail/tickets/ticket-list'
import { Accordion } from '~/components/ui/accordion'
import { PhotoGrid } from '~/components/ui/photo-grid'
import { EVENT_SECTIONS } from '~/data/events/page'
import type { EventPageData } from '~/types/events'

export interface EventMainProps {
    data: EventPageData
}

export function EventMain({ data: { event, gallery } }: EventMainProps) {
    const ended = event.status === 'ended'

    return (
        <div className='space-y-14'>
            <AboutBlock
                title={ended ? EVENT_SECTIONS.recap : EVENT_SECTIONS.about}
                event={event}
            />
            {ended && gallery.length > 0 && (
                <DetailBlock title={EVENT_SECTIONS.gallery}>
                    <PhotoGrid photos={gallery} />
                </DetailBlock>
            )}
            {!ended && event.tickets.length > 0 && <TicketList tickets={event.tickets} />}
            {!ended && event.schedule.length > 0 && (
                <ScheduleTimeline
                    schedule={event.schedule}
                    tone={event.tone}
                />
            )}
            {event.hosts.length > 0 && (
                <HostList
                    hosts={event.hosts}
                    tone={event.tone}
                />
            )}
            {!ended && <GoodToKnow event={event} />}
            {!ended && event.faqs.length > 0 && (
                <DetailBlock title={EVENT_SECTIONS.faqs}>
                    <Accordion items={event.faqs} />
                </DetailBlock>
            )}
            {!ended && <Policies event={event} />}
            <OrganizerCard />
        </div>
    )
}
