export const WHATSAPP = {
    number: '918484830110',
    linkBase: 'https://wa.me',
    hint: ' (opens WhatsApp)',
} as const

export const WHATSAPP_MESSAGES = {
    explore: "Hi Echoverse Hub! 👋 I'd love to know what's coming up. Could you share the upcoming events?",
    booking: (event: string, when: string, city: string, price: string) =>
        `Hi Echoverse Hub! 🎉 I'd like to book ${event} on ${when} in ${city} (from ${price}). Could you help me with the tickets?`,
} as const
