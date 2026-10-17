import { z } from 'zod'
import { COMPLIMENTARY_COPY } from '~/data/attendees/complimentary'
import { TICKET_LIMITS } from '~/data/events/limits'

const { errors } = COMPLIMENTARY_COPY

export const complimentarySchema = z.object({
    ticket_type_id: z.string().min(1, errors.ticket),
    quantity: z
        .number({ error: errors.quantity })
        .int(errors.quantity)
        .min(1, errors.quantity)
        .max(TICKET_LIMITS.complimentaryMax, errors.quantity),
    name: z.string().trim().min(2, errors.name).max(80, errors.name),
    email: z.string().trim().toLowerCase().pipe(z.email(errors.email)),
    phone: z
        .string()
        .trim()
        .refine((phone) => /^\d{10,13}$/.test(phone.replace(/\D/g, '')), errors.phone),
    note: z.string().trim().max(200, errors.note),
})

export type ComplimentaryValues = z.infer<typeof complimentarySchema>
