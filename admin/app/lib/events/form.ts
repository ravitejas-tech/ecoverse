import { fromIstInput, toIstInput } from '~/lib/date-input'
import { faqListSchema, hostListSchema, scheduleListSchema } from '~/schemas/event-content'
import type { EventFormValues } from '~/schemas/event'
import type { EventRow, EventUpdate } from '~/types/events'

const toItems = (values: readonly string[]) => values.map((value) => ({ value }))

const fromItems = (items: readonly { value: string }[]) => items.map(({ value }) => value).filter(Boolean)

const filled = <Item extends Record<string, string>>(items: readonly Item[]) =>
    items.filter((item) => Object.values(item).some(Boolean))

export function eventToForm(event: EventRow): EventFormValues {
    return {
        title: event.title,
        slug: event.slug,
        category: event.category,
        tag: event.tag,
        tone: event.tone,
        summary: event.summary,
        starts_at: toIstInput(event.starts_at),
        ends_at: toIstInput(event.ends_at),
        city: event.city,
        city_code: event.city_code,
        region: event.region,
        venue_name: event.venue_name,
        venue_address: event.venue_address,
        venue_lat: event.venue_lat,
        venue_lng: event.venue_lng,
        cover_url: event.cover_url ?? '',
        cover_alt: event.cover_alt,
        cover_credit: event.cover_credit ?? '',
        cover_source: event.cover_source ?? '',
        description: event.description,
        highlights: toItems(event.highlights),
        schedule: scheduleListSchema.parse(event.schedule),
        hosts: hostListSchema.parse(event.hosts),
        age_limit: event.age_limit,
        language: event.language,
        dress_code: event.dress_code,
        included: toItems(event.included),
        not_included: toItems(event.not_included),
        things_to_know: toItems(event.things_to_know),
        faqs: faqListSchema.parse(event.faqs),
        terms: event.terms,
        refund_policy: event.refund_policy,
    }
}

export function formToEventUpdate(values: EventFormValues): EventUpdate {
    return {
        ...values,
        starts_at: fromIstInput(values.starts_at),
        ends_at: fromIstInput(values.ends_at),
        cover_url: values.cover_url || null,
        cover_credit: values.cover_credit || null,
        cover_source: values.cover_source || null,
        highlights: fromItems(values.highlights),
        schedule: filled(values.schedule),
        hosts: filled(values.hosts),
        included: fromItems(values.included),
        not_included: fromItems(values.not_included),
        things_to_know: fromItems(values.things_to_know),
        faqs: filled(values.faqs),
    }
}
