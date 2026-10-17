import type { PopTone } from '~/data/ui/pop-tones'
import type { BookingGroup } from '~/types/account'
import type { Enums } from '~/types/database'

export const MY_TICKETS_META = {
    title: 'My Tickets · Echoverse Hub',
    description: 'All your Echoverse bookings in one place. Log in with a code sent to your email.',
    robots: 'noindex, nofollow',
} as const

export const MY_TICKETS_HEADING = {
    eyebrow: 'My Tickets',
    title: 'Your tickets, one tap away',
} as const

export const ACCOUNT_COPY = {
    signedInAs: 'Logged in as',
    signOut: 'Log out',
    loading: 'Loading your bookings',
    loadFailed: "We couldn't load your bookings. Pull to refresh or try again.",
    retry: 'Try again',
} as const

export const BOOKING_GROUPS: { key: BookingGroup; title: string; tone: PopTone }[] = [
    { key: 'upcoming', title: 'Upcoming', tone: 'lime' },
    { key: 'past', title: 'Past', tone: 'violet' },
    { key: 'cancelled', title: 'Cancelled', tone: 'orange' },
]

export const bookingGroupTitleId = (group: BookingGroup) => `bookings-${group}`

export const BOOKING_ROW_COPY = {
    tickets: (count: number) => (count === 1 ? '1 ticket' : `${count} tickets`),
    resend: 'Email my tickets again',
} as const

export const ORDER_STATUS_LABELS: Record<Enums<'order_status'>, string> = {
    paid: 'Confirmed',
    pending: 'Pending',
    expired: 'Expired',
    failed: 'Failed',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
}

export const RESEND_TOASTS = {
    sent: 'Tickets sent! Check your inbox.',
} as const

export const NO_BOOKINGS = {
    emoji: '🎟️',
    title: 'No tickets yet',
    body: 'Book your first Echoverse event and your tickets land right here.',
    action: 'Explore Events',
} as const
