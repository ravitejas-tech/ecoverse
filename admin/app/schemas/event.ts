import { z } from 'zod'
import { EVENT_FORM_ERRORS as errors } from '~/data/events/form'
import { SUMMARY_MAX_LENGTH, TITLE_LENGTH } from '~/data/events/limits'
import { Constants } from '~/types/database'

const { event_category, pop_tone } = Constants.public.Enums

const text = z.string().trim()

const textItem = z.object({ value: text })

const optionalUrl = z.union([z.literal(''), z.url({ error: errors.url, protocol: /^https?$/ })])

export const eventTitleSchema = text.min(TITLE_LENGTH.min, errors.title).max(TITLE_LENGTH.max, errors.titleLong)

export const eventSummarySchema = text.min(1, errors.summary).max(SUMMARY_MAX_LENGTH, errors.summaryLong)

export const venuePinFields = {
    venue_lat: z.number().nullable(),
    venue_lng: z.number().nullable(),
}

export const cityCodeSchema = z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{3}$/, errors.cityCode)

export const eventFormSchema = z
    .object({
        title: eventTitleSchema,
        slug: text.regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, errors.slug),
        category: z.enum(event_category),
        tag: text.max(30, errors.tag),
        tone: z.enum(pop_tone),
        summary: eventSummarySchema,
        starts_at: z.string().min(1, errors.startsAt),
        ends_at: z.string().min(1, errors.endsAt),
        city: text.min(2, errors.city),
        city_code: cityCodeSchema,
        region: text.min(2, errors.region),
        venue_name: text,
        venue_address: text,
        ...venuePinFields,
        cover_url: z.string(),
        cover_alt: text,
        cover_credit: text,
        cover_source: optionalUrl,
        description: text,
        highlights: z.array(textItem),
        schedule: z.array(z.object({ time: text, title: text })),
        hosts: z.array(z.object({ name: text, role: text })),
        age_limit: text,
        language: text,
        dress_code: text,
        included: z.array(textItem),
        not_included: z.array(textItem),
        things_to_know: z.array(textItem),
        faqs: z.array(z.object({ question: text, answer: text })),
        terms: text,
        refund_policy: text,
    })
    .refine(({ starts_at, ends_at }) => ends_at > starts_at, { path: ['ends_at'], message: errors.endsBeforeStart })
    .refine(({ cover_url, cover_alt }) => !cover_url || cover_alt.length > 0, {
        path: ['cover_alt'],
        message: errors.coverAlt,
    })

export type EventFormValues = z.infer<typeof eventFormSchema>
