import { ORDER_PARAMS } from '~/data/orders/query'
import { useListParams } from '~/hooks/use-list-params'
import { parseOrderFilter } from '~/lib/orders'
import type { OrderFilter } from '~/types/orders'

export function useOrderFilters() {
    const { params, search, searchText, setSearchText, setParam } = useListParams(ORDER_PARAMS.search)

    return {
        query: {
            eventId: params.get(ORDER_PARAMS.event) ?? '',
            filter: parseOrderFilter(params.get(ORDER_PARAMS.status)),
            search,
        },
        searchText,
        setSearchText,
        setEventId: (eventId: string) => setParam(ORDER_PARAMS.event, eventId),
        setFilter: (filter: OrderFilter) => setParam(ORDER_PARAMS.status, filter === 'all' ? '' : filter),
    }
}
