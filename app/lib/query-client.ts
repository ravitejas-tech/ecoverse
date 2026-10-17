import { QueryClient } from '@tanstack/react-query'

let browserClient: QueryClient | undefined

function createQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: { staleTime: 30_000, retry: 1, refetchOnWindowFocus: false },
            mutations: { retry: 0 },
        },
    })
}

export function getQueryClient() {
    if (typeof window === 'undefined') return createQueryClient()
    browserClient ??= createQueryClient()
    return browserClient
}
