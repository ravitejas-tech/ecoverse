import { useSearchParams } from 'react-router'
import { EventCard } from '~/components/events/list/event-card'
import { EmptyState } from '~/components/ui/empty-state'
import { Notice } from '~/components/ui/notice'
import { SearchInput } from '~/components/ui/search-input'
import { SegmentedControl } from '~/components/ui/segmented-control'
import { Spinner } from '~/components/ui/spinner'
import { EVENTS_COPY } from '~/data/events/copy'
import { EVENT_FILTER_PARAM, EVENT_FILTERS, EVENT_SEARCH_PARAM } from '~/data/events/filters'
import { ERROR_COPY, LOADING_LABEL } from '~/data/ui/feedback'
import { useEventOverviews } from '~/hooks/events/queries'
import { eventFilterOf, matchesEventSearch } from '~/lib/events/status'
import { withParam } from '~/lib/search-params'
import type { EventFilter } from '~/types/events'

const isFilter = (value: string | null): value is EventFilter => EVENT_FILTERS.some((option) => option.value === value)

export function EventBrowser() {
    const [params, setParams] = useSearchParams()
    const requested = params.get(EVENT_FILTER_PARAM)
    const filter: EventFilter = isFilter(requested) ? requested : 'upcoming'
    const search = params.get(EVENT_SEARCH_PARAM) ?? ''
    const { data, isPending, isError } = useEventOverviews()

    const events = (data ?? []).filter((event) =>
        search ? matchesEventSearch(event, search) : eventFilterOf(event) === filter,
    )
    const ordered = filter === 'past' || search ? events : events.toReversed()
    const empty = search ? EVENTS_COPY.empty.search : EVENTS_COPY.empty[filter]

    return (
        <div className='space-y-5'>
            <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
                <SegmentedControl
                    label={EVENTS_COPY.filterLabel}
                    options={EVENT_FILTERS}
                    value={filter}
                    onChange={(value) => setParams(withParam(params, EVENT_FILTER_PARAM, value), { replace: true })}
                />
                <SearchInput
                    value={search}
                    onValueChange={(value) =>
                        setParams(withParam(params, EVENT_SEARCH_PARAM, value), { replace: true })
                    }
                    clearLabel={EVENTS_COPY.clearSearch}
                    aria-label={EVENTS_COPY.searchLabel}
                    placeholder={EVENTS_COPY.searchPlaceholder}
                    className='md:w-80'
                />
            </div>
            {isPending && <Spinner label={LOADING_LABEL} />}
            {isError && <Notice tone='pink'>{ERROR_COPY.failed.details}</Notice>}
            {data && ordered.length === 0 && <EmptyState {...empty} />}
            <ul className='space-y-4'>
                {ordered.map((event) => (
                    <li key={event.id}>
                        <EventCard event={event} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
