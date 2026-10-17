import type { BookingOrder, BookingState } from '~/types/booking'

export function bookingState({ status, needs_refund }: BookingOrder): BookingState {
    if (status === 'paid') return 'confirmed'
    return needs_refund ? 'needs-refund' : status
}
