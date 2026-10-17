import { resendTickets } from '~/services/orders'
import { supabase } from '~/services/supabase'
import type { ComplimentaryValues } from '~/schemas/complimentary'

export async function listAttendees(eventId: string) {
    const { data, error } = await supabase
        .from('tickets')
        .select(
            'id, code, checked_in_at, ticket_types(name), orders!inner(id, booking_code, name, email, phone, answers, status)',
        )
        .eq('event_id', eventId)
        .eq('status', 'valid')
        .eq('orders.status', 'paid')
        .order('created_at')
        .order('code')
    if (error) throw error
    return data
}

export async function issueComplimentary({ eventId, values }: { eventId: string; values: ComplimentaryValues }) {
    const { data, error } = await supabase.rpc('issue_complimentary', {
        p_event_id: eventId,
        p_ticket_type_id: values.ticket_type_id,
        p_quantity: values.quantity,
        p_name: values.name,
        p_email: values.email,
        p_phone: values.phone,
        p_note: values.note,
    })
    if (error) throw error
    const emailed = await resendTickets(data.id).then(
        () => true,
        () => false,
    )
    return { order: data, emailed }
}
