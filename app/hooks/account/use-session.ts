import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useSessionQuery } from '~/hooks/account/queries'
import { onSessionChange } from '~/services/auth'

export function useSession() {
    const queryClient = useQueryClient()
    const session = useSessionQuery()

    useEffect(() => onSessionChange((next) => queryClient.setQueryData(useSessionQuery.getKey(), next)), [queryClient])

    return session
}
