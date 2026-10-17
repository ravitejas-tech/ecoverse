import { COMMUNITY_DEFAULTS } from '~/data/community/filters'
import { COMMUNITY_PARAMS } from '~/data/community/query'
import { useListParams } from '~/hooks/use-list-params'
import { parseCommunitySegment, parseCommunitySort } from '~/lib/community/members'
import type { CommunitySegment, CommunitySort } from '~/types/community'

export function useCommunityFilters() {
    const { params, search, searchText, setSearchText, setParam } = useListParams(COMMUNITY_PARAMS.search)

    return {
        query: {
            segment: parseCommunitySegment(params.get(COMMUNITY_PARAMS.segment)),
            sort: parseCommunitySort(params.get(COMMUNITY_PARAMS.sort)),
            search,
        },
        searchText,
        setSearchText,
        setSegment: (segment: CommunitySegment) =>
            setParam(COMMUNITY_PARAMS.segment, segment === COMMUNITY_DEFAULTS.segment ? '' : segment),
        setSort: (sort: CommunitySort) => setParam(COMMUNITY_PARAMS.sort, sort === COMMUNITY_DEFAULTS.sort ? '' : sort),
    }
}
