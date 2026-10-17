import { z } from 'zod'
import { ORDERS_COPY } from '~/data/orders/copy'
import { NOTES_MAX_LENGTH, REASON_MIN_LENGTH } from '~/data/orders/status'
import { formatRupees } from '~/lib/format'

const reason = z.string().trim().min(REASON_MIN_LENGTH, ORDERS_COPY.reasonError)

export const notesSchema = z.object({
    notes: z.string().max(NOTES_MAX_LENGTH, ORDERS_COPY.notes.tooLong),
})

export const cancelSchema = z.object({ reason })

export function createRefundSchema(total: number) {
    const message = ORDERS_COPY.refund.amountError(formatRupees(total))
    return z.object({
        mode: z.enum(['full', 'partial']),
        amount: z.number(message).int(message).min(1, message).max(total, message),
        reason,
    })
}

export const questionListSchema = z.array(z.object({ id: z.string(), label: z.string() })).catch([])

export const answersSchema = z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).catch({})

export type NotesValues = z.infer<typeof notesSchema>
export type CancelValues = z.infer<typeof cancelSchema>
export type RefundValues = z.infer<ReturnType<typeof createRefundSchema>>
