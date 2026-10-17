import type { PopTone } from '~/data/ui/pop-tones'
import type { BookingStatus, TicketStatus } from '~/types/events'

export const FEW_LEFT_THRESHOLD = 10

export const BOOKABLE_STATUSES: BookingStatus[] = ['on-sale', 'few-left']

export const EVENT_STATUS_PRIORITY: TicketStatus[] = ['on-sale', 'few-left', 'opens-later', 'sold-out']

export const STATUS_STICKERS: Record<Exclude<BookingStatus, 'on-sale'>, { label: string; tone: PopTone }> = {
    'few-left': { label: 'Few left 🔥', tone: 'orange' },
    'sold-out': { label: 'Sold out', tone: 'pink' },
    'opens-later': { label: 'Opens', tone: 'cyan' },
    closed: { label: 'Sales closed', tone: 'violet' },
    ended: { label: 'That’s a wrap 🎉', tone: 'lime' },
}

export const BOOK_BUTTON_LABELS: Record<BookingStatus, string> = {
    'on-sale': 'Book Now',
    'few-left': 'Book Now',
    'sold-out': 'Sold out',
    'opens-later': 'Opens',
    closed: 'Sales closed',
    ended: 'Event ended',
}
