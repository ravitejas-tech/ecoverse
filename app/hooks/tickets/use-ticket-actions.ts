import { CALENDAR_MIME_TYPE, calendarDescription, calendarFileName, calendarUid } from '~/data/tickets/calendar'
import { TICKET_ACTIONS_COPY } from '~/data/tickets/ticket'
import { SITE } from '~/data/seo/site'
import { buildIcs } from '~/lib/calendar'
import { eventWhen } from '~/lib/checkout/event-labels'
import { downloadFile } from '~/lib/download'
import { whatsappShareUrl } from '~/lib/whatsapp'
import type { Booking } from '~/types/booking'
import { ticketPath } from '~/data/navigation'

export function useTicketActions(accessToken: string, { order, event }: Booking) {
    const ticketUrl = () => `${location.origin}${ticketPath(accessToken)}`

    const shareOnWhatsApp = () =>
        window.open(
            whatsappShareUrl(TICKET_ACTIONS_COPY.shareMessage(event.title, eventWhen(event.starts_at), ticketUrl())),
            '_blank',
            'noopener,noreferrer',
        )

    const addToCalendar = () =>
        downloadFile(
            calendarFileName(order.booking_code),
            buildIcs({
                uid: calendarUid(order.id, SITE.url),
                title: event.title,
                startsAt: event.starts_at,
                endsAt: event.ends_at,
                location: [event.venue_name, event.venue_address, event.city].filter(Boolean).join(', '),
                description: calendarDescription(order.booking_code, ticketUrl()),
                url: ticketUrl(),
            }),
            CALENDAR_MIME_TYPE,
        )

    return { shareOnWhatsApp, addToCalendar, print: () => window.print() }
}
