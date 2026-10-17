import { CALENDAR_PRODUCT_ID } from '~/data/tickets/calendar'
import type { CalendarEntry } from '~/types/booking'

const icsDate = (iso: string) =>
    new Date(iso)
        .toISOString()
        .replace(/[-:]/g, '')
        .replace(/\.\d{3}/, '')

const icsText = (text: string) =>
    text
        .replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\n')
        .replace(/([,;])/g, '\\$1')

export function buildIcs({ uid, title, startsAt, endsAt, location, description, url }: CalendarEntry) {
    return [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        `PRODID:${CALENDAR_PRODUCT_ID}`,
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${icsDate(new Date().toISOString())}`,
        `DTSTART:${icsDate(startsAt)}`,
        `DTEND:${icsDate(endsAt)}`,
        `SUMMARY:${icsText(title)}`,
        `LOCATION:${icsText(location)}`,
        `DESCRIPTION:${icsText(description)}`,
        `URL:${url}`,
        'END:VEVENT',
        'END:VCALENDAR',
    ].join('\r\n')
}
