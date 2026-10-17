import { formatEventDay, formatEventTime } from '~/lib/format'

export const eventWhen = (startsAt: string) => `${formatEventDay(startsAt)} · ${formatEventTime(startsAt)}`

export const eventWhere = (venueName: string, city: string) => (venueName ? `${venueName}, ${city}` : city)
