import { z } from 'zod'

export const functionErrorSchema = z.object({ error: z.object({ code: z.string() }) })

const pendingOrderSchema = z.object({
    id: z.string(),
    bookingCode: z.string(),
    accessToken: z.string(),
    subtotal: z.number(),
    discount: z.number(),
    total: z.number(),
    holdExpiresAt: z.string().nullable(),
})

const paymentSchema = z.discriminatedUnion('provider', [
    z.object({ provider: z.literal('free') }),
    z.object({ provider: z.literal('test') }),
    z.object({
        provider: z.literal('razorpay'),
        keyId: z.string(),
        providerOrderId: z.string(),
        amount: z.number(),
        currency: z.string(),
    }),
])

export const createOrderResultSchema = z.object({ order: pendingOrderSchema, payment: paymentSchema })

export const verifyPaymentResultSchema = z.object({
    status: z.enum(['paid', 'needs_attention']),
    accessToken: z.string(),
})

export const sendTicketsResultSchema = z.object({ sent: z.literal(true) })
