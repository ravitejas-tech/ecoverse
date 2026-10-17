import { createQuery } from 'react-query-kit'
import { getBooking } from '~/services/orders'

export const useBooking = createQuery({
    queryKey: ['tickets', 'booking'],
    fetcher: (accessToken: string) => getBooking(accessToken),
})
