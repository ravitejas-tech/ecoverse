import type { JourneyStep } from '~/types/landing'

export const JOURNEY_HEADING = {
    eyebrow: 'How it works',
    title: 'From “ooh what’s this” to “I’m in” in minutes.',
    scrawl: 'faster than your group chat picks a date',
}

export const JOURNEY_STEPS: JourneyStep[] = [
    {
        title: 'Discover',
        emoji: '👀',
        body: 'Spot it on Insta, open one page with every detail. Even the dress code.',
        tone: 'pink',
    },
    {
        title: 'Book',
        emoji: '📲',
        body: 'Pick your pass, pay with UPI or card. Done before the song ends.',
        tone: 'yellow',
    },
    {
        title: 'Get your QR',
        emoji: '🎟️',
        body: 'Your ticket lands instantly. No screenshots, no “send it again?”',
        tone: 'cyan',
    },
    { title: 'Walk right in', emoji: '✅', body: 'Beep. You’re in. Queue? What queue?', tone: 'lime' },
    { title: 'Come back', emoji: '🔁', body: 'Hear about the next one first. The party keeps going.', tone: 'violet' },
]
