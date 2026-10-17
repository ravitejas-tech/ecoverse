import { FunctionsFetchError, FunctionsHttpError } from '@supabase/supabase-js'
import { z } from 'zod'
import { bookingSchema } from '~/schemas/booking'
import {
    createOrderResultSchema,
    functionErrorSchema,
    sendTicketsResultSchema,
    verifyPaymentResultSchema,
} from '~/schemas/order'
import { supabase } from '~/services/supabase'
import type { CreateOrderInput, PromoQuoteInput, VerifyPaymentInput } from '~/types/checkout'

const MY_BOOKING_COLUMNS =
    'id, booking_code, access_token, status, total, created_at, events(slug, title, starts_at, ends_at, city, venue_name, cover_url, cover_alt, tone), tickets(count)'

async function functionErrorCode(error: unknown) {
    if (error instanceof FunctionsFetchError) return 'network'
    if (!(error instanceof FunctionsHttpError)) return 'unknown'
    const body = functionErrorSchema.safeParse(await error.context.json().catch(() => null))
    return body.success ? body.data.error.code : 'unknown'
}

async function invoke<T extends z.ZodType>(name: string, body: object, schema: T): Promise<z.output<T>> {
    const { data, error } = await supabase.functions.invoke(name, { body })
    if (error) throw new Error(await functionErrorCode(error))
    return schema.parse(data)
}

export const createOrder = (input: CreateOrderInput) => invoke('create-order', input, createOrderResultSchema)

export const verifyPayment = (input: VerifyPaymentInput) => invoke('verify-payment', input, verifyPaymentResultSchema)

export const sendTickets = (orderId: string) => invoke('send-tickets', { orderId }, sendTicketsResultSchema)

export async function quotePromo({ eventId, code, subtotal }: PromoQuoteInput) {
    const { data, error } = await supabase
        .rpc('quote_promo', { p_event_id: eventId, p_code: code, p_subtotal: subtotal })
        .single()
    if (error) throw new Error(error.message)
    return data
}

export async function getBooking(accessToken: string) {
    if (!z.guid().safeParse(accessToken).success) return null
    const { data, error } = await supabase.rpc('get_booking', { p_access_token: accessToken })
    if (error) throw new Error(error.message)
    return data === null ? null : bookingSchema.parse(data)
}

export async function listMyBookings(email: string) {
    const { data, error } = await supabase
        .from('orders')
        .select(MY_BOOKING_COLUMNS)
        .eq('email', email.toLowerCase())
        .order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return data
}
