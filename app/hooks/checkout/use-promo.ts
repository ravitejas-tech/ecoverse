import { useState } from 'react'
import { keepPreviousData } from '@tanstack/react-query'
import { usePromoQuote } from '~/hooks/checkout/queries'

export function usePromo(eventId: string, subtotal: number) {
    const [code, setCode] = useState<string | null>(null)
    const quote = usePromoQuote({
        variables: { eventId, code: code ?? '', subtotal },
        enabled: code !== null,
        placeholderData: keepPreviousData,
    })
    const applied = code !== null && !quote.isError && quote.data?.code === code ? quote.data : null

    return {
        applied,
        discount: applied?.discount ?? 0,
        error: code !== null ? quote.error : null,
        checking: code !== null && quote.isFetching && !applied,
        apply: setCode,
        remove: () => setCode(null),
    }
}
