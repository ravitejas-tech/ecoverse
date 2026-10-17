import { createInfiniteQuery, createQuery } from 'react-query-kit'
import { ORDERS_PAGE_SIZE } from '~/data/orders/query'
import { getOrder, listOrders } from '~/services/orders'
import type { OrderQuery } from '~/types/orders'

export const useOrders = createInfiniteQuery({
    queryKey: ['orders'],
    fetcher: (query: OrderQuery, { pageParam }) => listOrders(query, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
        pages.length * ORDERS_PAGE_SIZE < lastPage.count ? pages.length : undefined,
})

export const useOrder = createQuery({
    queryKey: ['order'],
    fetcher: (id: string) => getOrder(id),
})
