import { z } from 'zod'
import { PROMO_CODE_PATTERN } from '~/data/checkout/limits'
import { PROMO_COPY } from '~/data/checkout/summary'

export const promoFormSchema = z.object({
    code: z.string().trim().toUpperCase().regex(PROMO_CODE_PATTERN, PROMO_COPY.invalidFormat),
})
