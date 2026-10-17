import type { CommunityMember, CommunitySegment, CommunitySort, CommunitySortOrder } from '~/types/community'

export const COMMUNITY_DEFAULTS = { segment: 'all', sort: 'recent' } as const satisfies {
    segment: CommunitySegment
    sort: CommunitySort
}

export const COMMUNITY_SEGMENTS = [
    { value: 'all', label: 'All', hint: 'Everyone who has booked at least once.' },
    { value: 'new', label: 'New', hint: 'Booked for the first time in the last 30 days. Make them feel welcome.' },
    { value: 'regulars', label: 'Regulars', hint: 'Booked two or more different events.' },
    { value: 'upcoming', label: 'Coming up', hint: "Has a ticket for an event that hasn't happened yet." },
    { value: 'past', label: 'Past', hint: 'Came before but has nothing booked right now. Worth inviting back.' },
] as const

export const COMMUNITY_SEGMENT_MATCH: Record<
    CommunitySegment,
    Partial<Pick<CommunityMember, 'is_new' | 'is_regular' | 'has_upcoming'>>
> = {
    all: {},
    new: { is_new: true },
    regulars: { is_regular: true },
    upcoming: { has_upcoming: true },
    past: { has_upcoming: false },
}

export const COMMUNITY_SORTS = [
    { value: 'recent', label: 'Latest booking first' },
    { value: 'events', label: 'Most events first' },
    { value: 'spent', label: 'Top spenders first' },
    { value: 'name', label: 'Name, A to Z' },
] as const

export const COMMUNITY_SORT_ORDER: Record<CommunitySort, CommunitySortOrder> = {
    recent: { column: 'last_booked_at', ascending: false },
    events: { column: 'events_booked', ascending: false },
    spent: { column: 'total_spent', ascending: false },
    name: { column: 'name', ascending: true },
}
