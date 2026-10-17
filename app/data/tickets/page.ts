import type { PopTone } from '~/data/ui/pop-tones'
import type { BookingState } from '~/types/booking'

export const TICKET_META = {
    title: 'Your tickets · Echoverse Hub',
    description: 'Your Echoverse booking, QR tickets and event details.',
    robots: 'noindex, nofollow',
} as const

export const TICKET_LOADING_LABEL = 'Loading your tickets'

export const TICKET_IDS = {
    tickets: 'tickets-title',
    details: 'details-title',
} as const

export const timeRange = (start: string, end: string) => `${start} – ${end}`

export const CONFIRMED_COPY = {
    sticker: 'Booking confirmed ✦',
    title: "You're in! 🎉",
    lead: (email: string) => `Your tickets are below, and a copy is on its way to ${email}.`,
    bookingId: 'Booking ID',
    ticketsTitle: (count: number) => (count === 1 ? 'Your ticket' : `Your ${count} tickets`),
    ticketsHint: 'One QR per person. Show it at the gate with your screen brightness up.',
    swipeHint: 'Swipe for the next ticket →',
    detailsTitle: 'Where & when',
    thingsToKnow: 'Good to know',
} as const

export const PENDING_COPY = {
    emoji: '⏳',
    title: 'Confirming your payment…',
    body: 'This usually takes a few seconds. Keep this page open and your tickets will appear here.',
    slowEmoji: '🐢',
    slowTitle: 'Taking longer than usual',
    slowBody:
        "Your payment is still being confirmed. We'll email your tickets the moment it lands, so there's no need to pay again.",
} as const

export const CLOSED_STATES: Record<
    Exclude<BookingState, 'confirmed' | 'pending'>,
    { emoji: string; tone: PopTone; title: string; body: string; bookAgain: boolean }
> = {
    cancelled: {
        emoji: '🚫',
        tone: 'orange',
        title: 'This booking was cancelled',
        body: 'These tickets no longer work at the gate. Message us if you think this is a mistake.',
        bookAgain: false,
    },
    refunded: {
        emoji: '💸',
        tone: 'violet',
        title: 'This booking was refunded',
        body: 'The money is on its way back to you. Banks usually take 5 to 7 working days.',
        bookAgain: false,
    },
    'needs-refund': {
        emoji: '🙏',
        tone: 'yellow',
        title: "We'll refund you in full",
        body: 'Your payment came through after the seats were gone, so no tickets were issued. We will refund the full amount, no action needed.',
        bookAgain: false,
    },
    expired: {
        emoji: '⌛',
        tone: 'cyan',
        title: "This booking wasn't completed",
        body: 'The seat hold ran out before payment came through, so nothing was charged.',
        bookAgain: true,
    },
    failed: {
        emoji: '😕',
        tone: 'pink',
        title: "Payment didn't go through",
        body: 'No tickets were issued for this booking. If money left your account, message us and we will sort it out.',
        bookAgain: true,
    },
}

export const CLOSED_COPY = {
    bookAgain: 'Book again',
    reference: (code: string, title: string) => `Booking ${code} · ${title}`,
} as const

export const NOT_FOUND_COPY = {
    emoji: '🔍',
    title: "We can't find that booking",
    body: 'Check the link in your email, or log in to My Tickets to see every booking you have made.',
    action: 'Go to My Tickets',
} as const

export const LOAD_FAILED_COPY = {
    emoji: '📡',
    title: "We couldn't load your tickets",
    body: 'Check your connection and try again. Your booking is safe.',
    action: 'Try again',
} as const

export const BOOKING_HELP_MESSAGE = (code: string) => `Hi Echoverse Hub! 👋 I need help with my booking ${code}.`
