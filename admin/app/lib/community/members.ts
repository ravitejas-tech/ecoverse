import { COMMUNITY_COPY, MEMBER_BADGES } from '~/data/community/copy'
import { COMMUNITY_DEFAULTS, COMMUNITY_SEGMENTS, COMMUNITY_SORTS } from '~/data/community/filters'
import { formatDate } from '~/lib/format'
import type { CommunityMember, CommunitySegment, CommunitySort } from '~/types/community'

export function parseCommunitySegment(value: string | null): CommunitySegment {
    return COMMUNITY_SEGMENTS.find((option) => option.value === value)?.value ?? COMMUNITY_DEFAULTS.segment
}

export function parseCommunitySort(value: string | null): CommunitySort {
    return COMMUNITY_SORTS.find((option) => option.value === value)?.value ?? COMMUNITY_DEFAULTS.sort
}

export function segmentHint(segment: CommunitySegment) {
    return COMMUNITY_SEGMENTS.find((option) => option.value === segment)?.hint
}

export function memberBadges(member: Pick<CommunityMember, 'is_new' | 'is_regular'>) {
    return MEMBER_BADGES.filter(({ key }) => member[key])
}

export function eventLabel(title: string | null, startsAt: string | null) {
    return title && startsAt ? `${title} · ${formatDate(startsAt)}` : null
}

export function memberSummary({ first_booked_at, city }: Pick<CommunityMember, 'first_booked_at' | 'city'>) {
    return [COMMUNITY_COPY.member.firstBooked(formatDate(first_booked_at)), city].filter(Boolean).join(' · ')
}
