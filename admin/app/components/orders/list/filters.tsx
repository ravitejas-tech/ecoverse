import { SearchInput } from '~/components/ui/search-input'
import { SegmentedControl } from '~/components/ui/segmented-control'
import { Select } from '~/components/ui/select'
import { ORDERS_COPY } from '~/data/orders/copy'
import { ORDER_FILTERS } from '~/data/orders/status'
import { useEvents } from '~/hooks/events/queries'
import { eventOptions } from '~/lib/event-list'
import type { OrderFilter } from '~/types/orders'

const { list } = ORDERS_COPY

export interface OrderFiltersProps {
    searchText: string
    onSearchText: (value: string) => void
    eventId: string
    onEventId: (value: string) => void
    filter: OrderFilter
    onFilter: (value: OrderFilter) => void
}

export function OrderFilters({ searchText, onSearchText, eventId, onEventId, filter, onFilter }: OrderFiltersProps) {
    const { data: events = [] } = useEvents()

    return (
        <div className='mb-6 space-y-4'>
            <div className='grid gap-3 md:grid-cols-3'>
                <SearchInput
                    className='md:col-span-2'
                    value={searchText}
                    onValueChange={onSearchText}
                    clearLabel={list.clearSearch}
                    aria-label={list.searchLabel}
                    placeholder={list.searchPlaceholder}
                    autoComplete='off'
                />
                <Select
                    aria-label={list.eventLabel}
                    value={eventId}
                    onChange={(event) => onEventId(event.target.value)}
                    options={eventOptions(events)}
                    placeholder={list.allEvents}
                    className='md:w-80'
                />
            </div>
            <SegmentedControl
                label={list.statusLabel}
                options={ORDER_FILTERS}
                value={filter}
                onChange={onFilter}
            />
        </div>
    )
}
