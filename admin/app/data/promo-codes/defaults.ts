import { PROMO_CODES_COPY } from '~/data/promo-codes/copy'
import type { PromoCodeValues } from '~/schemas/promo-code'
import type { DiscountType } from '~/types/promo-codes'

export const PROMO_CODE_FORM_ID = 'promo-code-form'

export const DISCOUNT_TYPE_OPTIONS = [
    { value: 'percent', label: '% off' },
    { value: 'fixed', label: '₹ off' },
] as const satisfies readonly { value: DiscountType; label: string }[]

export const NEW_PROMO_CODE: PromoCodeValues = {
    code: '',
    label: '',
    discount_type: 'percent',
    discount_value: 10,
    event_id: '',
    max_uses: '',
    starts_at: '',
    expires_at: '',
    active: true,
}

export const PROMO_ERROR_MESSAGES: Readonly<Record<string, string>> = {
    '23505': PROMO_CODES_COPY.errors.duplicate,
    '42501': PROMO_CODES_COPY.errors.noAccess,
}
