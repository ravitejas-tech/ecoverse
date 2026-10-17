import { createQuery } from 'react-query-kit'
import { quotePromo } from '~/services/orders'
import type { PromoQuoteInput } from '~/types/checkout'

export const usePromoQuote = createQuery({
    queryKey: ['checkout', 'promo-quote'],
    fetcher: (input: PromoQuoteInput) => quotePromo(input),
    retry: false,
})
