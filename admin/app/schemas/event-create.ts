import { z } from 'zod'
import { EVENT_FORM_ERRORS as errors } from '~/data/events/form'
import { cityCodeSchema, eventSummarySchema, eventTitleSchema, venuePinFields } from '~/schemas/event'
import { Constants } from '~/types/database'

export const newEventSchema = z
    .object({
        title: eventTitleSchema,
        category: z.enum(Constants.public.Enums.event_category),
        date: z.string().min(1, errors.date),
        start_time: z.string().min(1, errors.time),
        end_time: z.string().min(1, errors.time),
        city: z.string().trim().min(2, errors.city),
        city_code: cityCodeSchema,
        venue_name: z.string().trim().min(2, errors.venue),
        venue_address: z.string().trim(),
        ...venuePinFields,
        summary: eventSummarySchema,
        cover: z.instanceof(File).optional(),
        cover_alt: z.string().trim(),
    })
    .refine(({ cover, cover_alt }) => !cover || cover_alt.length > 0, { path: ['cover_alt'], message: errors.coverAlt })

export type NewEventValues = z.infer<typeof newEventSchema>
