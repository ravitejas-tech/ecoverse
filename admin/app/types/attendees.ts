import type { ATTENDEE_FILTERS } from '~/data/attendees/copy'
import type { listAttendees } from '~/services/attendees'

export type Attendee = Awaited<ReturnType<typeof listAttendees>>[number]

export type AttendeeFilter = (typeof ATTENDEE_FILTERS)[number]['value']
