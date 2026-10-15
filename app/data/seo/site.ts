export const SITE = {
    url: 'https://echoversehub.com',
    shortName: 'Echoverse',
    locale: 'en_IN',
    language: 'en-IN',
    country: 'IN',
} as const

export const ROBOTS_DIRECTIVES = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

export const SOCIAL_IMAGE = {
    path: '/og/echoverse-hub.png',
    width: 1200,
    height: 630,
    type: 'image/png',
    alt: 'Echoverse Hub — Plans? Sorted. Vibes? Immaculate. Dance nights, mixers, workshops and trips.',
} as const

export const BRAND_ICONS = {
    favicon: { path: '/icons/favicon-32.png', size: 32 },
    appleTouch: '/icons/apple-touch-icon.png',
    small: { path: '/icons/icon-192.png', size: 192 },
    large: { path: '/icons/icon-512.png', size: 512 },
    maskable: { path: '/icons/icon-maskable-512.png', size: 512 },
} as const

export const THEME_COLORS = {
    light: '#fff6ea',
    dark: '#140c28',
} as const
