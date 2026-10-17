import { z } from 'zod'

export const fieldChangesSchema = z.record(z.string(), z.object({ from: z.unknown(), to: z.unknown() })).catch({})

export const activityDetailsSchema = z
    .object({
        name: z.string().nullish(),
        booking_code: z.string().nullish(),
        amount: z.number().nullish(),
        ticket_type: z.string().nullish(),
        quantity: z.number().nullish(),
        email: z.string().nullish(),
        ticket: z.string().nullish(),
    })
    .catch({})
