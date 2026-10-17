import { createQuery } from 'react-query-kit'
import { listTeam } from '~/services/team'

export const useTeam = createQuery({
    queryKey: ['team'],
    fetcher: listTeam,
})
