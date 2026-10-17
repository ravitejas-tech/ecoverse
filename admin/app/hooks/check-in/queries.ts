import { createQuery } from 'react-query-kit'
import { EVENTS_REFRESH_MS, LIVE_REFRESH_MS } from '~/data/check-in/scanner'
import { splitByTime } from '~/lib/check-in'
import { getCheckInEvent, getCheckInStats, listCheckInEvents, listRecentCheckIns } from '~/services/check-in'

export const useCheckInEvents = createQuery({
    queryKey: ['check-in-events'],
    fetcher: async () => splitByTime(await listCheckInEvents(), Date.now()),
    refetchInterval: EVENTS_REFRESH_MS,
})

export const useCheckInEvent = createQuery({
    queryKey: ['check-in-event'],
    fetcher: (eventId: string) => getCheckInEvent(eventId),
})

export const useCheckInStats = createQuery({
    queryKey: ['check-in-stats'],
    fetcher: (eventId: string) => getCheckInStats(eventId),
    refetchInterval: LIVE_REFRESH_MS,
})

export const useRecentCheckIns = createQuery({
    queryKey: ['check-in-recent'],
    fetcher: (eventId: string) => listRecentCheckIns(eventId),
    refetchInterval: LIVE_REFRESH_MS,
})
