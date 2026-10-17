import { createQuery } from 'react-query-kit'
import { listAttendees } from '~/services/attendees'

export const useAttendees = createQuery({
    queryKey: ['attendees'],
    fetcher: (eventId: string) => listAttendees(eventId),
})
