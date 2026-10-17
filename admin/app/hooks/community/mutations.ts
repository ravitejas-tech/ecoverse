import toast from 'react-hot-toast'
import { createMutation } from 'react-query-kit'
import { COMMUNITY_COPY } from '~/data/community/copy'
import { downloadCommunity } from '~/lib/community/csv'
import { listAllCommunityMembers } from '~/services/community'
import type { CommunityQuery } from '~/types/community'

export const useDownloadCommunity = createMutation({
    mutationFn: async (query: CommunityQuery) => downloadCommunity(await listAllCommunityMembers(query), query.segment),
    onError: () => toast.error(COMMUNITY_COPY.list.downloadFailed),
})
