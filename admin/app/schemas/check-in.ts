import { z } from 'zod'
import { CHECK_IN_COPY } from '~/data/check-in/copy'
import { Constants } from '~/types/database'

export const checkInResponseSchema = z.object({
    result: z.enum(Constants.public.Enums.check_in_result),
    ticket_code: z.string().nullish(),
    booking_code: z.string().nullish(),
    attendee: z.string().nullish(),
    ticket_type: z.string().nullish(),
    event_title: z.string().nullish(),
    checked_in_at: z.string().nullish(),
    first_checked_in_at: z.string().nullish(),
})

export const manualEntrySchema = z.object({
    value: z.string().trim().min(3, CHECK_IN_COPY.manual.error),
})

export type ManualEntryValues = z.infer<typeof manualEntrySchema>
