import type { EventPreview } from '~/types/landing'

export const EVENTS_HEADING = {
    eyebrow: 'Coming up',
    title: 'Fresh drops for your calendar 🔥',
    scrawl: 'set a reminder. or don’t. (do.)',
}

export const EVENT_BOOK_LABEL = 'Book Now'

export const EVENT_PRICE_PREFIX = 'from'

export const eventAnchorId = (slug: string) => `event-${slug}`

export const FEATURED_EVENT: EventPreview = {
    slug: 'bollywood-dance-night-pune',
    title: 'Bollywood Dance Night',
    category: 'Dance night',
    description:
        'A full night of Bollywood bangers, a packed dance floor and zero judgement. Two left feet welcome — come solo or bring the squad.',
    photo: {
        src: '/images/events/bollywood-dance-night.webp',
        alt: 'Women in saris dancing together under blue party lights',
        credit: 'Photo by Adhitya Sibikumar on Unsplash',
        source: 'https://unsplash.com/photos/kpDmx-MPi5g',
    },
    startsAt: '2026-11-14T20:00:00+05:30',
    endsAt: '2026-11-15T00:00:00+05:30',
    city: 'Pune',
    region: 'Maharashtra',
    priceFrom: 399,
    tag: 'Early bird 🐦',
    tone: 'pink',
}

export const UPCOMING_EVENTS: EventPreview[] = [
    FEATURED_EVENT,
    {
        slug: 'rooftop-social-mixer-mumbai',
        title: 'Rooftop Social Mixer',
        category: 'Social mixer',
        description:
            'Sunset, city views and a rooftop full of new people. Easy icebreakers, good music and a group to leave with.',
        photo: {
            src: '/images/events/rooftop-social-mixer.webp',
            alt: 'Friends cheering with their hands up at a rooftop party at golden hour',
            credit: 'Photo by Vitaly Gariev on Unsplash',
            source: 'https://unsplash.com/photos/M9ozCAVRLKo',
        },
        startsAt: '2026-11-20T19:00:00+05:30',
        endsAt: '2026-11-20T23:00:00+05:30',
        city: 'Mumbai',
        region: 'Maharashtra',
        priceFrom: 499,
        tag: 'Selling fast 🔥',
        tone: 'yellow',
    },
    {
        slug: 'pottery-and-playlists-pune',
        title: 'Pottery & Playlists',
        category: 'Workshop',
        description:
            'Get your hands in the clay with a guided pottery session set to a curated playlist. Make a piece, take it home.',
        photo: {
            src: '/images/events/pottery-and-playlists.webp',
            alt: 'A pottery wheel spinning beside bowls of clay-shaping tools',
            credit: 'Photo by Taylor Heery on Unsplash',
            source: 'https://unsplash.com/photos/ZSgWcW70cTs',
        },
        startsAt: '2026-11-29T16:00:00+05:30',
        endsAt: '2026-11-29T19:00:00+05:30',
        city: 'Pune',
        region: 'Maharashtra',
        priceFrom: 599,
        tag: 'Only 50 spots 🎟️',
        tone: 'cyan',
    },
]
