import { createQuery } from 'react-query-kit'
import { listPromoCodes } from '~/services/promo-codes'

export const usePromoCodes = createQuery({
    queryKey: ['promo-codes'],
    fetcher: listPromoCodes,
})
