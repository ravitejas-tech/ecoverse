import { createQuery } from 'react-query-kit'
import { getSession } from '~/services/auth'
import { listMyBookings } from '~/services/orders'

export const useSessionQuery = createQuery({
    queryKey: ['account', 'session'],
    fetcher: () => getSession(),
    staleTime: Infinity,
})

export const useMyBookings = createQuery({
    queryKey: ['account', 'bookings'],
    fetcher: (email: string) => listMyBookings(email),
})
