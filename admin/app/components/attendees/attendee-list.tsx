import { useMemo, useState } from 'react'
import { AttendeeToolbar } from '~/components/attendees/attendee-toolbar'
import { ComplimentaryDialog } from '~/components/attendees/complimentary-dialog'
import { DataTable } from '~/components/ui/data-table'
import { EmptyState } from '~/components/ui/empty-state'
import { Notice } from '~/components/ui/notice'
import { Spinner } from '~/components/ui/spinner'
import { ticketOptionLabel } from '~/data/attendees/complimentary'
import { ATTENDEES_COPY } from '~/data/attendees/copy'
import { EVENT_PATHS } from '~/data/events/links'
import { ERROR_COPY, LOADING_LABEL } from '~/data/ui/feedback'
import { useAttendees } from '~/hooks/attendees/queries'
import { useTicketTypes } from '~/hooks/events/tickets/queries'
import { useCan } from '~/hooks/staff/use-can'
import { downloadAttendees } from '~/lib/attendees/csv'
import { attendeeColumns, matchesAttendee } from '~/lib/attendees/rows'
import { formatCount } from '~/lib/format'
import { eventQuestionsSchema } from '~/schemas/event-questions'
import type { AttendeeFilter } from '~/types/attendees'
import type { EventRow } from '~/types/events'

export function AttendeeList({ event }: { event: EventRow }) {
    const canGive = useCan('issueComplimentary')
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState<AttendeeFilter>('all')
    const [giving, setGiving] = useState(false)
    const { data: attendees = [], isPending, isError } = useAttendees({ variables: event.id })
    const { data: tickets = [] } = useTicketTypes({ variables: event.id })
    const questions = useMemo(() => eventQuestionsSchema.parse(event.questions), [event.questions])
    const columns = useMemo(() => attendeeColumns(questions), [questions])
    const rows = attendees.filter((attendee) => matchesAttendee(attendee, search, filter))
    const checkedIn = attendees.filter(({ checked_in_at }) => checked_in_at).length
    const ticketOptions = tickets.map(({ id, name, remaining }) => ({
        value: id,
        label: ticketOptionLabel(name, formatCount(remaining)),
    }))

    return (
        <div className='space-y-5'>
            <AttendeeToolbar
                summary={ATTENDEES_COPY.summary(formatCount(attendees.length), formatCount(checkedIn))}
                search={search}
                filter={filter}
                onSearch={setSearch}
                onFilter={setFilter}
                onDownload={
                    attendees.length > 0 ? () => downloadAttendees(event.slug, attendees, questions) : undefined
                }
                onGiveFree={canGive && tickets.length > 0 ? () => setGiving(true) : undefined}
            />
            {isPending && <Spinner label={LOADING_LABEL} />}
            {isError && <Notice tone='pink'>{ERROR_COPY.failed.details}</Notice>}
            {!isPending && !isError && (
                <DataTable
                    columns={columns}
                    rows={rows}
                    rowKey={({ id }) => id}
                    rowHref={({ orders }) => EVENT_PATHS.order(orders.id)}
                    caption={ATTENDEES_COPY.caption}
                    empty={
                        <EmptyState {...(attendees.length === 0 ? ATTENDEES_COPY.empty : ATTENDEES_COPY.noMatches)} />
                    }
                />
            )}
            {giving && (
                <ComplimentaryDialog
                    eventId={event.id}
                    ticketOptions={ticketOptions}
                    onClose={() => setGiving(false)}
                />
            )}
        </div>
    )
}
