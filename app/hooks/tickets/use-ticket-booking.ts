import { useState } from 'react'
import { TICKET_POLLING } from '~/data/tickets/polling'
import { useBooking } from '~/hooks/tickets/queries'

export function useTicketBooking(accessToken: string) {
    const [pollUntil] = useState(() => Date.now() + TICKET_POLLING.forMs)
    const booking = useBooking({
        variables: accessToken,
        refetchInterval: ({ state }) =>
            state.data?.order.status === 'pending' && Date.now() < pollUntil ? TICKET_POLLING.everyMs : false,
    })
    return { booking, pollUntil }
}
