import { useSearchParams } from 'react-router'
import { EventFilters } from '~/components/events/directory/event-filters'
import { EventResults } from '~/components/events/directory/event-results'
import { useHydrated } from '~/hooks/use-hydrated'
import {
    applyEventFilters,
    distinctValues,
    eventFilterParams,
    eventsByWhen,
    readEventFilters,
} from '~/lib/event-filters'
import type { EventFilters as Filters, EventSummary } from '~/types/events'

export interface EventDirectoryProps {
    events: EventSummary[]
}

export function EventDirectory({ events }: EventDirectoryProps) {
    const hydrated = useHydrated()
    const [searchParams, setSearchParams] = useSearchParams()
    const filters = readEventFilters(hydrated ? searchParams : new URLSearchParams())
    const inGroup = eventsByWhen(events, filters.when)
    const visible = applyEventFilters(inGroup, filters)
    const cities = distinctValues([...inGroup.map(({ city }) => city), ...(filters.city ? [filters.city] : [])])
    const categories = distinctValues([
        ...inGroup.map(({ category }) => category),
        ...(filters.category ? [filters.category] : []),
    ])

    const update = (next: Filters) =>
        setSearchParams(eventFilterParams(next), { replace: true, preventScrollReset: true })

    return (
        <>
            <EventFilters
                filters={filters}
                cities={cities}
                categories={categories}
                onChange={update}
            />
            <EventResults
                events={visible}
                when={filters.when}
                filtered={Boolean(filters.city || filters.category)}
                onReset={() =>
                    update(
                        filters.city || filters.category
                            ? { ...filters, city: null, category: null }
                            : { when: 'upcoming', city: null, category: null },
                    )
                }
            />
        </>
    )
}
