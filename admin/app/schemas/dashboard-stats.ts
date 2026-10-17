import { z } from 'zod'

const amount = z.coerce.number()

export const dashboardStatsSchema = z.object({
    tickets_sold: amount,
    checked_in: amount,
    gross_sales: amount,
    net_sales: amount,
    average_order_value: amount,
    capacity: amount,
    remaining: amount,
    orders: z.object({
        paid: amount,
        pending: amount,
        abandoned: amount,
        failed: amount,
        cancelled: amount,
        refunded: amount,
        needs_refund: amount,
        complimentary: amount,
    }),
    refunds: z.object({ count: amount, amount }),
    page_views: amount,
    unique_visitors: amount,
    conversion_rate: amount,
    customers: z.object({ total: amount, repeat: amount }),
    ticket_types: z.array(
        z.object({
            id: z.string(),
            event_title: z.string(),
            name: z.string(),
            price: amount,
            quantity: amount,
            sold: amount,
            revenue: amount,
            remaining: amount,
        }),
    ),
    promo_codes: z.array(z.object({ code: z.string(), uses: amount, discount: amount, revenue: amount })),
    sources: z.array(z.object({ source: z.string(), orders: amount, revenue: amount })),
    daily: z
        .array(z.object({ day: z.string(), orders: amount, revenue: amount }))
        .nullable()
        .transform((days) => days ?? []),
})
