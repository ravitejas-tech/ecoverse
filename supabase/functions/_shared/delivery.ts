import type { SupabaseClient } from 'npm:@supabase/supabase-js@2'
import type { Booking } from './booking.ts'
import { sendEmail } from './email.ts'
import { buildRefundEmail, buildTicketEmail } from './ticket-email.ts'

export async function loadBooking(admin: SupabaseClient, orderId: string) {
    const { data: order, error } = await admin.from('orders').select('access_token').eq('id', orderId).single()
    if (error || !order) throw new Error('order_not_found')
    const { data: booking, error: bookingError } = await admin.rpc('get_booking', { p_access_token: order.access_token })
    if (bookingError || !booking) throw new Error('order_not_found')
    return { booking: booking as Booking, accessToken: order.access_token as string }
}

export async function deliverTickets(admin: SupabaseClient, orderId: string) {
    const { booking, accessToken } = await loadBooking(admin, orderId)
    if (booking.order.status !== 'paid' || booking.tickets.length === 0) return false
    await sendEmail(await buildTicketEmail(booking, accessToken))
    return true
}

export async function deliverTicketsQuietly(admin: SupabaseClient, orderId: string) {
    try {
        return await deliverTickets(admin, orderId)
    } catch (error) {
        console.error('Ticket email failed', orderId, error)
        return false
    }
}

export async function deliverRefundNotice(admin: SupabaseClient, orderId: string, amount: number) {
    try {
        const { booking } = await loadBooking(admin, orderId)
        await sendEmail(buildRefundEmail(booking, amount))
    } catch (error) {
        console.error('Refund email failed', orderId, error)
    }
}
