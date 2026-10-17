import { CalendarDays, Clock, IdCard, Languages, MapPin, Shirt } from 'lucide-react'

export const RELATED_EVENTS_LIMIT = 3

export const PREVIEW_PARAM = 'preview'

export const EVENT_META = {
    title: (title: string, city: string) => `${title} in ${city} · Echoverse Hub`,
    description: (day: string, place: string, summary: string) => `${day} · ${place}. ${summary}`,
    previewRobots: 'noindex, nofollow',
    titleLimit: 60,
    descriptionLimit: 155,
} as const

export const BREADCRUMB_LABELS = { home: 'Home', events: 'Events' } as const

export const EVENT_HEADER_COPY = {
    back: 'All events',
    preview: 'Preview — not published',
    map: 'Open in Google Maps',
    mapHint: ' (opens Google Maps)',
} as const

export const EVENT_FACTS = {
    date: { label: 'Date', icon: CalendarDays, tone: 'pink' },
    time: { label: 'Time', icon: Clock, tone: 'yellow' },
    venue: { label: 'Venue', icon: MapPin, tone: 'cyan' },
    age: { label: 'Age', icon: IdCard, tone: 'lime' },
    language: { label: 'Language', icon: Languages, tone: 'violet' },
    dressCode: { label: 'Dress code', icon: Shirt, tone: 'orange' },
} as const

export const EVENT_SECTIONS = {
    about: 'About this event',
    highlights: 'Highlights',
    tickets: 'Tickets',
    schedule: 'How the night goes',
    hosts: 'Your hosts',
    goodToKnow: 'Good to know',
    included: 'What’s included',
    notIncluded: 'Not included',
    thingsToKnow: 'Things to know',
    faqs: 'Questions people ask',
    policies: 'Terms & refunds',
    organizer: 'Who’s hosting',
    recap: 'The recap',
    gallery: 'Photos from the night',
} as const

export const RELATED_HEADING = {
    id: 'more-events',
    eyebrow: 'Up next ✦',
    title: 'More events coming up',
} as const

export const TICKET_COPY = {
    admits: (people: number) => `Admits ${people}`,
} as const

export const BOOKING_COPY = {
    share: 'Share',
    shareText: (title: string, day: string) => `${title} · ${day}. Coming?`,
    copied: 'Link copied. Paste it anywhere 📋',
    copyFailed: 'Couldn’t copy the link. Copy it from the address bar.',
    ask: 'Ask us',
    help: 'Questions? We reply on WhatsApp.',
    preview: 'Preview only',
} as const

export const POLICY_COPY = {
    terms: 'Terms & conditions',
    refund: 'Refund & cancellation',
    siteTerms: 'Read our full terms',
    siteRefunds: 'Read our refund policy',
} as const

export const ORGANIZER_COPY = {
    body: 'Every Echoverse event is planned and hosted by our own crew. One brand, one community, real humans on WhatsApp if you need anything.',
    about: 'More about us',
} as const

export const PAST_EVENT_COPY = {
    emoji: '🎟️',
    title: 'Missed this one?',
    body: 'New nights drop all the time. Catch the next one before it sells out.',
    cta: 'See what’s coming up',
} as const

export const EVENT_LOADING_LABEL = 'Loading the event…'
