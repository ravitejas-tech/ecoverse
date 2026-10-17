import type { BookingGroup, MyBooking } from '~/types/account'

const startsAt = ({ events }: MyBooking) => Date.parse(events.starts_at)

function groupOf(booking: MyBooking, now: number): BookingGroup {
    if (booking.status !== 'paid') return 'cancelled'
    return Date.parse(booking.events.ends_at) < now ? 'past' : 'upcoming'
}

export function groupBookings(bookings: MyBooking[], now: number) {
    const groups: Record<BookingGroup, MyBooking[]> = { upcoming: [], past: [], cancelled: [] }
    bookings.forEach((booking) => groups[groupOf(booking, now)].push(booking))
    groups.upcoming.sort((a, b) => startsAt(a) - startsAt(b))
    groups.past.sort((a, b) => startsAt(b) - startsAt(a))
    return groups
}
