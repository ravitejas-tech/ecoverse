import { z } from 'zod'
import { Constants } from '~/types/database'

const { order_status, order_source, event_category, pop_tone, ticket_status } = Constants.public.Enums

export const bookingSchema = z.object({
    order: z.object({
        id: z.string(),
        booking_code: z.string(),
        status: z.enum(order_status),
        source: z.enum(order_source),
        name: z.string(),
        email: z.string(),
        phone: z.string(),
        subtotal: z.number(),
        discount: z.number(),
        total: z.number(),
        needs_refund: z.boolean(),
        hold_expires_at: z.string().nullable(),
        paid_at: z.string().nullable(),
        created_at: z.string(),
    }),
    event: z.object({
        id: z.string(),
        slug: z.string(),
        title: z.string(),
        category: z.enum(event_category),
        tone: z.enum(pop_tone),
        starts_at: z.string(),
        ends_at: z.string(),
        city: z.string(),
        venue_name: z.string(),
        venue_address: z.string(),
        venue_lat: z.number().nullable(),
        venue_lng: z.number().nullable(),
        map_url: z.string().nullable(),
        cover_url: z.string().nullable(),
        cover_alt: z.string(),
        dress_code: z.string(),
        things_to_know: z.array(z.string()),
    }),
    items: z.array(
        z.object({
            name: z.string(),
            quantity: z.number(),
            unit_price: z.number(),
            admits: z.number(),
        }),
    ),
    tickets: z.array(
        z.object({
            code: z.string(),
            qr_token: z.string(),
            status: z.enum(ticket_status),
            checked_in_at: z.string().nullable(),
            ticket_type: z.string(),
        }),
    ),
})
