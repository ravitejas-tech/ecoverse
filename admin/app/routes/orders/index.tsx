import { OrderFilters } from '~/components/orders/list/filters'
import { OrdersTable } from '~/components/orders/list/table'
import { LoadMoreButton } from '~/components/ui/load-more-button'
import { PageHeader } from '~/components/ui/page-header'
import { Spinner } from '~/components/ui/spinner'
import { Text } from '~/components/ui/text'
import { ORDERS_COPY } from '~/data/orders/copy'
import { LOADING_LABEL } from '~/data/ui/feedback'
import { useOrderFilters } from '~/hooks/orders/use-order-filters'
import { useOrders } from '~/hooks/orders/queries'
import { requirePermission } from '~/lib/guards'

const { list } = ORDERS_COPY

export async function clientLoader() {
    await requirePermission('viewOrders')
    return null
}

export default function Orders() {
    const { query, searchText, setSearchText, setEventId, setFilter } = useOrderFilters()
    const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage } = useOrders({ variables: query })
    const orders = data?.pages.flatMap(({ rows }) => rows) ?? []
    const total = data?.pages[0]?.count ?? 0

    return (
        <>
            <PageHeader
                title={list.title}
                description={list.description}
            />
            <OrderFilters
                searchText={searchText}
                onSearchText={setSearchText}
                eventId={query.eventId}
                onEventId={setEventId}
                filter={query.filter}
                onFilter={setFilter}
            />
            {isPending ? (
                <Spinner label={LOADING_LABEL} />
            ) : (
                <div className='space-y-4'>
                    {total > 0 && (
                        <Text
                            variant='small'
                            tone='muted'
                            aria-live='polite'>
                            {list.count(orders.length, total)}
                        </Text>
                    )}
                    <OrdersTable orders={orders} />
                    <LoadMoreButton
                        hasMore={hasNextPage}
                        loading={isFetchingNextPage}
                        onLoadMore={() => void fetchNextPage()}
                        label={list.loadMore}
                        loadingLabel={list.loadingMore}
                    />
                </div>
            )}
        </>
    )
}
