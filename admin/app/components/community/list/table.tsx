import { EventCell } from '~/components/community/list/event-cell'
import { MemberBadges } from '~/components/community/member-badges'
import { DataTable } from '~/components/ui/data-table'
import { EmptyState } from '~/components/ui/empty-state'
import { COMMUNITY_COPY } from '~/data/community/copy'
import { COMMUNITY_PATHS } from '~/data/community/query'
import { memberBadges } from '~/lib/community/members'
import { formatCount, formatRupees } from '~/lib/format'
import type { CommunityMember } from '~/types/community'
import type { TableColumn } from '~/types/table'

const { columns, list, none } = COMMUNITY_COPY

const MEMBER_COLUMNS: TableColumn<CommunityMember>[] = [
    { key: 'name', header: columns.name, cell: (member) => member.name, wideOnPhone: true, nowrap: true },
    {
        key: 'tag',
        header: columns.tag,
        cell: (member) => (memberBadges(member).length > 0 ? <MemberBadges member={member} /> : none),
    },
    { key: 'email', header: columns.email, cell: (member) => member.email, hideOnPhone: true },
    { key: 'phone', header: columns.phone, cell: (member) => member.phone, nowrap: true },
    { key: 'city', header: columns.city, cell: (member) => member.city ?? none, hideOnPhone: true },
    { key: 'events', header: columns.events, cell: (member) => formatCount(member.events_booked), align: 'end' },
    { key: 'spent', header: columns.spent, cell: (member) => formatRupees(member.total_spent), align: 'end' },
    {
        key: 'last-event',
        header: columns.lastEvent,
        cell: (member) => (
            <EventCell
                title={member.last_event_title}
                startsAt={member.last_event_at}
            />
        ),
        hideOnPhone: true,
    },
    {
        key: 'next-event',
        header: columns.nextEvent,
        cell: (member) => (
            <EventCell
                title={member.next_event_title}
                startsAt={member.next_event_at}
            />
        ),
        wideOnPhone: true,
    },
]

export function CommunityTable({ members }: { members: CommunityMember[] }) {
    return (
        <DataTable
            columns={MEMBER_COLUMNS}
            rows={members}
            rowKey={(member) => member.id}
            rowHref={(member) => COMMUNITY_PATHS.member(member.id)}
            caption={list.caption}
            empty={<EmptyState {...list.empty} />}
        />
    )
}
