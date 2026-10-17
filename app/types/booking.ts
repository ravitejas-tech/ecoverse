import type { z } from 'zod'
import type { bookingSchema } from '~/schemas/booking'

export type Booking = z.infer<typeof bookingSchema>

export type BookingOrder = Booking['order']

export type BookingEvent = Booking['event']

export type BookingTicket = Booking['tickets'][number]

export type BookingState = 'confirmed' | 'pending' | 'cancelled' | 'refunded' | 'needs-refund' | 'expired' | 'failed'

export interface CalendarEntry {
    uid: string
    title: string
    startsAt: string
    endsAt: string
    location: string
    description: string
    url: string
}
