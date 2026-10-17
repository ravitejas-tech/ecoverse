import { createQuery } from 'react-query-kit'
import { getEvent, listEventOverviews, listEvents } from '~/services/events'

export const useEvents = createQuery({
    queryKey: ['events'],
    fetcher: listEvents,
})

export const useEventOverviews = createQuery({
    queryKey: ['events', 'overviews'],
    fetcher: listEventOverviews,
})

export const useEvent = createQuery({
    queryKey: ['events', 'detail'],
    fetcher: (id: string) => getEvent(id),
})
