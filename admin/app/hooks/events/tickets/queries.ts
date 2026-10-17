import { createQuery } from 'react-query-kit'
import { listTicketTypes } from '~/services/ticket-types'

export const useTicketTypes = createQuery({
    queryKey: ['ticket-types'],
    fetcher: (eventId: string) => listTicketTypes(eventId),
})
