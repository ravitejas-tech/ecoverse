import { EVENT_FILTER_PARAMS } from '~/data/events/filters'
import { PATHS } from '~/data/navigation'
import { isEventCategory } from '~/lib/events'
import type { EventFilters, EventSummary, EventWhen } from '~/types/events'

export function readEventFilters(params: URLSearchParams): EventFilters {
    const category = params.get(EVENT_FILTER_PARAMS.category)
    return {
        when: params.get(EVENT_FILTER_PARAMS.when) === 'past' ? 'past' : 'upcoming',
        city: params.get(EVENT_FILTER_PARAMS.city),
        category: isEventCategory(category) ? category : null,
    }
}

export function eventsByWhen(events: EventSummary[], when: EventWhen) {
    const upcoming = events.filter(({ status }) => status !== 'ended')
    return when === 'upcoming' ? upcoming : events.filter(({ status }) => status === 'ended').reverse()
}

export function applyEventFilters(events: EventSummary[], { city, category }: EventFilters) {
    return events.filter((event) => (!city || event.city === city) && (!category || event.category === category))
}

export function distinctValues<T>(values: T[]) {
    return [...new Set(values)]
}

export function eventFilterParams({ when, city, category }: Partial<EventFilters>) {
    const params = new URLSearchParams()
    if (when === 'past') params.set(EVENT_FILTER_PARAMS.when, when)
    if (city) params.set(EVENT_FILTER_PARAMS.city, city)
    if (category) params.set(EVENT_FILTER_PARAMS.category, category)
    return params
}

export function eventsHref(filters: Partial<EventFilters>) {
    const search = eventFilterParams(filters).toString()
    return search ? `${PATHS.events}?${search}` : PATHS.events
}
