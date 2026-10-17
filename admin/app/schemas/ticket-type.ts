import { z } from 'zod'
import { TICKET_LIMITS } from '~/data/events/limits'
import { TICKETS_COPY } from '~/data/events/tickets'

const { errors } = TICKETS_COPY

const whole = (message: string) => z.number({ error: message }).int(message)

export const ticketTypeSchema = z
    .object({
        name: z.string().trim().min(TICKET_LIMITS.nameMin, errors.name).max(TICKET_LIMITS.nameMax, errors.name),
        description: z.string().trim().max(200, errors.description),
        price: whole(errors.price).min(0, errors.price),
        quantity: whole(errors.quantity).min(1, errors.quantity),
        admits: whole(errors.admits).min(1, errors.admits).max(TICKET_LIMITS.admitsMax, errors.admits),
        min_per_order: whole(errors.perOrder).min(1, errors.perOrder).max(TICKET_LIMITS.perOrderMax, errors.perOrder),
        max_per_order: whole(errors.perOrder).min(1, errors.perOrder).max(TICKET_LIMITS.perOrderMax, errors.perOrder),
        sales_start: z.string(),
        sales_end: z.string(),
        visible: z.boolean(),
        sold_out: z.boolean(),
    })
    .refine(({ min_per_order, max_per_order }) => max_per_order >= min_per_order, {
        path: ['max_per_order'],
        message: errors.maxBelowMin,
    })
    .refine(({ sales_start, sales_end }) => !sales_start || !sales_end || sales_end > sales_start, {
        path: ['sales_end'],
        message: errors.windowOrder,
    })

export type TicketTypeValues = z.infer<typeof ticketTypeSchema>
