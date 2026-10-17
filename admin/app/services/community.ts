import { COMMUNITY_SEGMENT_MATCH, COMMUNITY_SORT_ORDER } from '~/data/community/filters'
import {
    COMMUNITY_EXPORT_BATCH_SIZE,
    COMMUNITY_PAGE_SIZE,
    COMMUNITY_SEARCH_COLUMNS,
    MEMBER_BOOKING_STATUSES,
} from '~/data/community/query'
import { searchAcross } from '~/lib/search'
import { communityMemberSchema, communityStatsSchema } from '~/schemas/community'
import { supabase } from '~/services/supabase'
import type { CommunityMember, CommunityQuery } from '~/types/community'

const membersSchema = communityMemberSchema.array()

function membersQuery({ segment, sort, search }: CommunityQuery, count?: 'exact') {
    const { column, ascending } = COMMUNITY_SORT_ORDER[sort]
    let query = supabase
        .rpc('community_members', {}, { count })
        .match(COMMUNITY_SEGMENT_MATCH[segment])
        .order(column, { ascending })
        .order('id')
    const searchFilter = searchAcross(COMMUNITY_SEARCH_COLUMNS, search)
    if (searchFilter) query = query.or(searchFilter)
    return query
}

export async function listCommunityMembers(query: CommunityQuery, page: number) {
    const from = page * COMMUNITY_PAGE_SIZE
    const { data, error, count } = await membersQuery(query, 'exact').range(from, from + COMMUNITY_PAGE_SIZE - 1)
    if (error) throw error
    return { rows: membersSchema.parse(data), count: count ?? 0 }
}

export async function listAllCommunityMembers(query: CommunityQuery) {
    const members: CommunityMember[] = []
    for (let from = 0; ; from += COMMUNITY_EXPORT_BATCH_SIZE) {
        const { data, error } = await membersQuery(query).range(from, from + COMMUNITY_EXPORT_BATCH_SIZE - 1)
        if (error) throw error
        members.push(...membersSchema.parse(data))
        if (data.length < COMMUNITY_EXPORT_BATCH_SIZE) return members
    }
}

export async function getCommunityStats() {
    const { data, error } = await supabase.rpc('community_stats').single()
    if (error) throw error
    return communityStatsSchema.parse(data)
}

export async function getCommunityMember(id: string) {
    const { data, error } = await supabase.rpc('community_members').eq('id', id).maybeSingle()
    if (error) throw error
    return data && communityMemberSchema.parse(data)
}

export async function listMemberBookings(customerId: string) {
    const { data, error } = await supabase
        .from('orders')
        .select(
            'id, booking_code, total, status, needs_refund, created_at, events(title, starts_at), order_items(quantity, admits)',
        )
        .eq('customer_id', customerId)
        .in('status', MEMBER_BOOKING_STATUSES)
        .order('created_at', { ascending: false })
    if (error) throw error
    return data
}
