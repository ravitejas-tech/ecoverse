import { CalendarHeart, IndianRupee, Megaphone, Repeat, ScanLine, Sparkles, Ticket, UsersRound } from 'lucide-react'
import { COMMUNITY_COPY } from '~/data/community/copy'
import { formatCount, formatPercent, formatRupees } from '~/lib/format'
import type { CommunityMember, CommunityStats } from '~/types/community'
import type { StatCardConfig } from '~/types/stat-card'

const { stats, member } = COMMUNITY_COPY

export const COMMUNITY_STAT_CARDS: readonly StatCardConfig<CommunityStats>[] = [
    {
        key: 'total',
        label: stats.total.label,
        icon: UsersRound,
        tone: 'pink',
        value: ({ total }) => formatCount(total),
        hint: () => stats.total.hint,
    },
    {
        key: 'new',
        label: stats.new.label,
        icon: Sparkles,
        tone: 'lime',
        value: ({ new_members }) => formatCount(new_members),
        hint: () => stats.new.hint,
    },
    {
        key: 'regulars',
        label: stats.regulars.label,
        icon: Repeat,
        tone: 'cyan',
        value: ({ regulars }) => formatCount(regulars),
        hint: ({ regulars, total }) => stats.regulars.hint(formatPercent(regulars, total)),
    },
    {
        key: 'news',
        label: stats.news.label,
        icon: Megaphone,
        tone: 'yellow',
        value: ({ updates_ok }) => formatCount(updates_ok),
        hint: () => stats.news.hint,
    },
]

export const MEMBER_STAT_CARDS: readonly StatCardConfig<CommunityMember>[] = [
    {
        key: 'events',
        label: member.stats.events.label,
        icon: CalendarHeart,
        tone: 'pink',
        value: ({ events_booked }) => formatCount(events_booked),
        hint: () => member.stats.events.hint,
    },
    {
        key: 'attended',
        label: member.stats.attended.label,
        icon: ScanLine,
        tone: 'lime',
        value: ({ events_attended }) => formatCount(events_attended),
        hint: () => member.stats.attended.hint,
    },
    {
        key: 'tickets',
        label: member.stats.tickets.label,
        icon: Ticket,
        tone: 'cyan',
        value: ({ tickets }) => formatCount(tickets),
        hint: () => member.stats.tickets.hint,
    },
    {
        key: 'spent',
        label: member.stats.spent.label,
        icon: IndianRupee,
        tone: 'yellow',
        value: ({ total_spent }) => formatRupees(total_spent),
        hint: () => member.stats.spent.hint,
    },
]
