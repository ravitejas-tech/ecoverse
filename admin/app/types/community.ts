import type { z } from 'zod'
import type { COMMUNITY_SEGMENTS, COMMUNITY_SORTS } from '~/data/community/filters'
import type { communityMemberSchema, communityStatsSchema } from '~/schemas/community'
import type { listMemberBookings } from '~/services/community'

export type CommunitySegment = (typeof COMMUNITY_SEGMENTS)[number]['value']

export type CommunitySort = (typeof COMMUNITY_SORTS)[number]['value']

export interface CommunityQuery {
    segment: CommunitySegment
    sort: CommunitySort
    search: string
}

export type CommunityMember = z.infer<typeof communityMemberSchema>

export type CommunityStats = z.infer<typeof communityStatsSchema>

export type MemberBooking = Awaited<ReturnType<typeof listMemberBookings>>[number]

export interface CommunitySortOrder {
    column: Extract<keyof CommunityMember, 'last_booked_at' | 'events_booked' | 'total_spent' | 'name'>
    ascending: boolean
}
