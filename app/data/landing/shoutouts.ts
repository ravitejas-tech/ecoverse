import type { Shoutout } from '~/types/landing'

export const SHOUTOUTS_HEADING = {
    eyebrow: 'Overheard at Echoverse',
    title: 'Proof the vibes are real 📸',
    scrawl: 'names withheld to protect the dancing',
}

export const SHOUTOUTS: Shoutout[] = [
    {
        quote: 'Came alone, left with a whole friend group and zero voice left.',
        handle: 'a very tired dancer',
        tone: 'pink',
        photo: {
            src: '/images/shoutouts/dance-floor.webp',
            alt: 'A packed dance floor with friends dancing under golden party lights',
            credit: 'Photo by Nereid Ndreu on Unsplash',
            source: 'https://unsplash.com/photos/h3bZqJlAMOs',
        },
    },
    {
        quote: 'Booked in the auto on the way. Scanned in before my friends found parking.',
        handle: 'the punctual one, for once',
        tone: 'lime',
        photo: {
            src: '/images/shoutouts/auto-ride.webp',
            alt: 'Black and yellow auto rickshaws on a city street at night',
            credit: 'Photo by Raimond Klavins on Unsplash',
            source: 'https://unsplash.com/photos/FCFFZxRWcCw',
        },
    },
    {
        quote: 'I made a pot. It is ugly. I love it. Coming back next month.',
        handle: 'pottery workshop survivor',
        tone: 'cyan',
        photo: {
            src: '/images/shoutouts/pottery-wheel.webp',
            alt: 'Hands shaping a clay pot on a spinning pottery wheel',
            credit: 'Photo by Vitaly Gariev on Unsplash',
            source: 'https://unsplash.com/photos/BFBikYWtA9c',
        },
    },
    {
        quote: 'Finally, a plan the group chat agreed on in under ten minutes.',
        handle: 'group chat admin',
        tone: 'yellow',
        photo: {
            src: '/images/shoutouts/colour-party.webp',
            alt: 'Friends celebrating Holi, throwing coloured powder and confetti into the air',
            credit: 'Photo by Dibakar Roy on Unsplash',
            source: 'https://unsplash.com/photos/bVDOSSL4tms',
        },
    },
]
