import { COMMUNITY_COPY } from '~/data/community/copy'
import { CSV_FILE } from '~/data/ui/files'
import { eventLabel } from '~/lib/community/members'
import { toCsv } from '~/lib/csv'
import { istToday } from '~/lib/date-input'
import { downloadFile } from '~/lib/download'
import { formatDate } from '~/lib/format'
import type { CommunityMember, CommunitySegment } from '~/types/community'

const { csv } = COMMUNITY_COPY
const { headers } = csv

const CSV_COLUMNS: readonly { header: string; cell: (member: CommunityMember) => string }[] = [
    { header: headers.name, cell: ({ name }) => name },
    { header: headers.email, cell: ({ email }) => email },
    { header: headers.phone, cell: ({ phone }) => phone },
    { header: headers.city, cell: ({ city }) => city ?? '' },
    { header: headers.eventsBooked, cell: ({ events_booked }) => String(events_booked) },
    { header: headers.showedUp, cell: ({ events_attended }) => String(events_attended) },
    { header: headers.tickets, cell: ({ tickets }) => String(tickets) },
    { header: headers.spent, cell: ({ total_spent }) => String(total_spent) },
    { header: headers.firstBooked, cell: ({ first_booked_at }) => formatDate(first_booked_at) },
    { header: headers.lastBooked, cell: ({ last_booked_at }) => formatDate(last_booked_at) },
    {
        header: headers.lastEvent,
        cell: ({ last_event_title, last_event_at }) => eventLabel(last_event_title, last_event_at) ?? '',
    },
    {
        header: headers.nextEvent,
        cell: ({ next_event_title, next_event_at }) => eventLabel(next_event_title, next_event_at) ?? '',
    },
    { header: headers.news, cell: ({ marketing_consent }) => (marketing_consent ? csv.yes : csv.no) },
]

export function downloadCommunity(members: readonly CommunityMember[], segment: CommunitySegment) {
    const content = toCsv([
        CSV_COLUMNS.map(({ header }) => header),
        ...members.map((member) => CSV_COLUMNS.map(({ cell }) => cell(member))),
    ])
    downloadFile(
        `${csv.filePrefix}-${segment}-${istToday()}${CSV_FILE.extension}`,
        `${CSV_FILE.bom}${content}`,
        CSV_FILE.type,
    )
}
