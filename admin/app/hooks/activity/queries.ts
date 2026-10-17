import { createInfiniteQuery } from 'react-query-kit'
import { ACTIVITY_PAGE_SIZE } from '~/data/activity/filters'
import { toActivityItem } from '~/lib/activity'
import { listActivity } from '~/services/activity'
import type { ActivityFilter } from '~/types/activity'

export const useActivity = createInfiniteQuery({
    queryKey: ['activity'],
    fetcher: async (filter: ActivityFilter, { pageParam }) => {
        const { entries, names, count } = await listActivity(filter, pageParam)
        return { items: entries.map((entry) => toActivityItem(entry, names)), count }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
        pages.length * ACTIVITY_PAGE_SIZE < lastPage.count ? pages.length : undefined,
})
