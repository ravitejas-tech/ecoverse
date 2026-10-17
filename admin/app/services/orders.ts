import { ORDER_FILTER_MATCH } from '~/data/orders/status'
import { ORDER_SEARCH_COLUMNS, ORDERS_PAGE_SIZE } from '~/data/orders/query'
import { searchAcross } from '~/lib/search'
import { invokeFunction } from '~/services/functions'
import { supabase } from '~/services/supabase'
import type { CancelRequest, OrderQuery, RefundRequest } from '~/types/orders'

export async function listOrders({ eventId, filter, search }: OrderQuery, page: number) {
    const from = page * ORDERS_PAGE_SIZE
    let query = supabase
        .from('orders')
        .select(
            'id, booking_code, name, email, total, status, source, needs_refund, utm_source, created_at, events(title), order_items(quantity, admits)',
            { count: 'exact' },
        )
        .match(ORDER_FILTER_MATCH[filter])
        .order('created_at', { ascending: false })
        .range(from, from + ORDERS_PAGE_SIZE - 1)
    if (eventId) query = query.eq('event_id', eventId)
    const searchFilter = searchAcross(ORDER_SEARCH_COLUMNS, search)
    if (searchFilter) query = query.or(searchFilter)
    const { data, error, count } = await query
    if (error) throw error
    return { rows: data, count: count ?? 0 }
}

export async function getOrder(id: string) {
    const { data, error } = await supabase
        .from('orders')
        .select(
            '*, events(title, slug, questions), promo_codes(code), order_items(id, quantity, unit_price, admits, ticket_types(name)), tickets(id, code, status, checked_in_at, ticket_types(name))',
        )
        .eq('id', id)
        .order('code', { referencedTable: 'tickets' })
        .maybeSingle()
    if (error) throw error
    return data
}

export async function updateOrderNotes({ orderId, notes }: { orderId: string; notes: string }) {
    const { error } = await supabase.from('orders').update({ notes: notes.trim() }).eq('id', orderId)
    if (error) throw error
}

export async function cancelOrder({ orderId, reason }: CancelRequest) {
    const { error } = await supabase.rpc('cancel_order', { p_order_id: orderId, p_reason: reason.trim() })
    if (error) throw new Error(error.message)
}

export async function refundOrder({ orderId, amount, reason }: RefundRequest) {
    return invokeFunction<{ order: unknown }>('refund-order', { orderId, amount, reason: reason.trim() })
}

export async function resendTickets(orderId: string) {
    return invokeFunction<{ sent: boolean }>('send-tickets', { orderId })
}
