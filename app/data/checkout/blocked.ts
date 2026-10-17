import type { PopTone } from '~/data/ui/pop-tones'
import type { BlockedReason } from '~/types/checkout'
import type { BookingStatus } from '~/types/events'

export const BLOCKED_COPY: Record<
    BlockedReason,
    { emoji: string; tone: PopTone; title: string; body: (opensOn: string) => string }
> = {
    paused: {
        emoji: '⏸️',
        tone: 'yellow',
        title: 'Bookings are paused',
        body: () => 'We have paused sales for a bit. Check back soon, or message us and we will help.',
    },
    ended: {
        emoji: '🪩',
        tone: 'violet',
        title: 'This one has wrapped',
        body: () => 'The party is over for this event. Catch the next one!',
    },
    'sold-out': {
        emoji: '😭',
        tone: 'pink',
        title: 'All sold out',
        body: () => 'Every ticket is gone. Keep an eye out for the next drop.',
    },
    'not-open': {
        emoji: '⏰',
        tone: 'cyan',
        title: 'Tickets open soon',
        body: (opensOn) => `Sales start ${opensOn}. Set a reminder!`,
    },
    closed: {
        emoji: '🚪',
        tone: 'orange',
        title: 'Online sales have closed',
        body: () => 'Booking for this event is closed. Message us if you still want to come.',
    },
}

export const SUMMARY_BLOCK_REASONS: Partial<Record<BookingStatus, BlockedReason>> = {
    ended: 'ended',
    'opens-later': 'not-open',
    'sold-out': 'sold-out',
    closed: 'closed',
}

export const BLOCKED_ACTIONS = {
    explore: 'Explore Events',
} as const
