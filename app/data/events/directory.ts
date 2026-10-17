import type { EventWhen } from '~/types/events'
import { PATHS } from '~/data/navigation'
import type { PageMeta } from '~/lib/seo/meta'

export const EVENTS_PAGE: PageMeta = {
    title: 'Upcoming Events in Pune & Mumbai · Echoverse Hub',
    description:
        'Every Echoverse Hub event in one place: dance nights, social mixers, workshops and trips. Pick one, book in a minute and get your QR ticket.',
    path: PATHS.events,
}

export const DIRECTORY_HEADING = {
    eyebrow: 'All events ✦',
    title: 'Find your next night out',
    lead: 'Pick an event, book in a minute, walk in with your QR ticket.',
}

export const DIRECTORY_EMPTY = {
    upcoming: {
        emoji: '🗓️',
        title: 'Nothing on the calendar right now',
        body: 'New events drop all the time. Peek at past events, or ask us on WhatsApp what’s next.',
    },
    past: {
        emoji: '📸',
        title: 'No past events yet',
        body: 'Our first nights are still ahead. Come make some memories with us.',
    },
    filtered: {
        emoji: '🔍',
        title: 'Nothing matches those filters',
        body: 'Try another city or type of event, or clear the filters to see everything.',
    },
    clear: 'Clear filters',
    seeUpcoming: 'See upcoming events',
    askNext: 'Ask what’s next',
} as const

export const DIRECTORY_RESULTS = {
    count: (total: number, when: EventWhen) => `${total} ${when} ${total === 1 ? 'event' : 'events'}`,
} as const
