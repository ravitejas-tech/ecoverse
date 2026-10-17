import { keepPreviousData } from '@tanstack/react-query'
import { createQuery } from 'react-query-kit'
import { getDashboardStats } from '~/services/dashboard'

export const useDashboardStats = createQuery({
    queryKey: ['dashboard'],
    fetcher: (eventId: string | null) => getDashboardStats(eventId),
    placeholderData: keepPreviousData,
})
