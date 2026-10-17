import { PATHS } from '~/data/navigation'
import type { PageMeta } from '~/lib/seo/meta'
import type { Experience, Shoutout } from '~/types/landing'

export const ABOUT_PAGE: PageMeta = {
    title: 'About Echoverse Hub · Our Story',
    description:
        'Echoverse Hub hosts dance nights, social mixers, workshops and trips in Pune & Mumbai. One brand, one community, one official place to book.',
    path: PATHS.about,
}

export const ABOUT_HEADING = {
    eyebrow: 'Our story ✦',
    title: 'One brand. One community. A lot of very good nights.',
    lead: 'Echoverse Hub started with a simple idea: making plans should be the easy part.',
}

export const ABOUT_STORY = [
    'We kept seeing the same thing. Someone hears about a great night on Instagram, digs through six stories to find the venue, pays on a random link and then hopes the ticket shows up. By the time the group chat agrees, it’s sold out.',
    'So we built our own home. Every Echoverse dance night, social mixer, workshop and weekend trip lives here, with every detail on one page: the venue, the timings, the dress code, the refund policy, even who’s hosting.',
    'You book in a minute, your QR ticket lands instantly, and you walk right in. If anything goes sideways, a real person from our crew answers on WhatsApp.',
]

export const ABOUT_POLAROID: Shoutout = {
    quote: 'We built the place we wished existed when we were the ones planning the night.',
    handle: 'the Echoverse crew',
    tone: 'pink',
    photo: {
        src: '/images/shoutouts/dance-floor.webp',
        alt: 'A packed dance floor with friends dancing under golden party lights',
        credit: 'Photo by Nereid Ndreu on Unsplash',
        source: 'https://unsplash.com/photos/h3bZqJlAMOs',
    },
}

export const PROMISE_HEADING = {
    id: 'our-promise',
    eyebrow: 'Our promise',
    title: 'Three things we never mess with',
    scrawl: 'pinky promise, actually',
}

export const PROMISES: Experience[] = [
    { title: 'One official place', emoji: '🏠', caption: 'no random payment links. ever.', tone: 'pink' },
    { title: 'Instant QR tickets', emoji: '🎟️', caption: 'in your inbox in seconds', tone: 'yellow' },
    { title: 'Real humans on WhatsApp', emoji: '💬', caption: 'ask us anything, we reply', tone: 'cyan' },
]
