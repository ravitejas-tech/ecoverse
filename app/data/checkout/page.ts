import type { PopTone } from '~/data/ui/pop-tones'

export const CHECKOUT_META = {
    title: (eventTitle: string) => `Book ${eventTitle} · Echoverse Hub`,
    fallbackTitle: 'Book your spot · Echoverse Hub',
    description: 'Pick your tickets, add your details and pay. Your QR tickets arrive in seconds.',
    robots: 'noindex, nofollow',
} as const

export const CHECKOUT_HEADER = {
    back: 'Back to event',
    sticker: 'Book your spot ✦',
} as const

export const CHECKOUT_STEPS = {
    tickets: { number: '1', title: 'Pick your tickets', tone: 'pink' },
    details: { number: '2', title: 'Your details', tone: 'yellow' },
    summary: { number: '3', title: 'Promo & total', tone: 'cyan' },
} as const satisfies Record<string, { number: string; title: string; tone: PopTone }>

export const CHECKOUT_LOADING_LABEL = 'Loading tickets'
