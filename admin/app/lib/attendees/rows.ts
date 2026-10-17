import { z } from 'zod'
import { ATTENDEE_COLUMNS, ATTENDEES_COPY } from '~/data/attendees/copy'
import { formatEventTime, formatDateTime } from '~/lib/format'
import type { Attendee, AttendeeFilter } from '~/types/attendees'
import type { TableColumn } from '~/types/table'
import type { EventQuestion } from '~/types/questions'

const answersSchema = z.record(z.string(), z.unknown()).catch({})

export function answerText(attendee: Attendee, questionId: string, blank: string = ATTENDEES_COPY.noAnswer) {
    const value = answersSchema.parse(attendee.orders.answers)[questionId]
    return value === undefined || value === null || value === '' ? blank : String(value)
}

export function matchesAttendee(attendee: Attendee, search: string, filter: AttendeeFilter) {
    const checkedIn = attendee.checked_in_at !== null
    if ((filter === 'in' && !checkedIn) || (filter === 'out' && checkedIn)) return false
    const wanted = search.trim().toLowerCase()
    const { name, email, phone, booking_code } = attendee.orders
    return (
        !wanted ||
        [name, email, phone, booking_code, attendee.code].some((value) => value.toLowerCase().includes(wanted))
    )
}

export function attendeeColumns(questions: readonly EventQuestion[], forExport = false): TableColumn<Attendee>[] {
    const checkedIn = ({ checked_in_at }: Attendee) =>
        checked_in_at
            ? forExport
                ? formatDateTime(checked_in_at)
                : ATTENDEES_COPY.checkedInAt(formatEventTime(checked_in_at))
            : ATTENDEES_COPY.notYet
    return [
        { key: 'name', header: ATTENDEE_COLUMNS.name, cell: ({ orders }) => orders.name, nowrap: true },
        { key: 'ticket', header: ATTENDEE_COLUMNS.ticket, cell: ({ ticket_types }) => ticket_types.name, nowrap: true },
        { key: 'checked-in', header: ATTENDEE_COLUMNS.checkedIn, cell: checkedIn, nowrap: true },
        {
            key: 'email',
            header: ATTENDEE_COLUMNS.email,
            cell: ({ orders }) => orders.email,
            hideOnPhone: true,
            nowrap: true,
        },
        { key: 'phone', header: ATTENDEE_COLUMNS.phone, cell: ({ orders }) => orders.phone, nowrap: true },
        { key: 'booking', header: ATTENDEE_COLUMNS.booking, cell: ({ orders }) => orders.booking_code, nowrap: true },
        { key: 'code', header: ATTENDEE_COLUMNS.code, cell: ({ code }) => code, hideOnPhone: true, nowrap: true },
        ...questions.map((question) => ({
            key: `answer-${question.id}`,
            header: question.label,
            cell: (attendee: Attendee) => answerText(attendee, question.id, forExport ? '' : undefined),
            hideOnPhone: true,
            nowrap: true,
        })),
    ]
}
