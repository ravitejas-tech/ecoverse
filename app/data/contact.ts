export const WHATSAPP = {
    number: '918484830110',
    display: '+91 84848 30110',
    linkBase: 'https://wa.me',
    hint: ' (opens WhatsApp)',
} as const

export const WHATSAPP_MESSAGES = {
    help: 'Hi Echoverse Hub! 👋 I have a question.',
    eventQuestion: (event: string, day: string) => `Hi Echoverse Hub! 👋 I have a question about ${event} on ${day}.`,
} as const

export const CONTACT_LABELS = {
    whatsapp: 'Chat on WhatsApp',
    ask: 'Ask us on WhatsApp',
} as const

export const EMAIL = {
    address: 'hello@echoversehub.com',
    href: 'mailto:hello@echoversehub.com',
} as const

export const INSTAGRAM = {
    handle: '@echoversehub',
    url: 'https://www.instagram.com/echoversehub',
} as const
