import { z } from 'zod'
import { PROMO_FORM_COPY } from '~/data/promo-codes/form'
import { LABEL_MAX_LENGTH, PERCENT_MAX, POSITIVE_WHOLE_NUMBER, PROMO_CODE_PATTERN } from '~/data/promo-codes/limits'
import { Constants } from '~/types/database'

const { errors } = PROMO_FORM_COPY

export const promoCodeSchema = z
    .object({
        code: z.string().trim().toUpperCase().regex(PROMO_CODE_PATTERN, errors.code),
        label: z.string().trim().max(LABEL_MAX_LENGTH, errors.label),
        discount_type: z.enum(Constants.public.Enums.discount_type),
        discount_value: z.number({ error: errors.value }).int(errors.value).min(1, errors.value),
        event_id: z.string(),
        max_uses: z
            .string()
            .trim()
            .refine((value) => value === '' || POSITIVE_WHOLE_NUMBER.test(value), errors.maxUses),
        starts_at: z.string(),
        expires_at: z.string(),
        active: z.boolean(),
    })
    .refine(({ discount_type, discount_value }) => discount_type !== 'percent' || discount_value <= PERCENT_MAX, {
        path: ['discount_value'],
        message: errors.percentMax,
    })
    .refine(({ starts_at, expires_at }) => !starts_at || !expires_at || expires_at > starts_at, {
        path: ['expires_at'],
        message: errors.expiresBeforeStart,
    })

export type PromoCodeValues = z.infer<typeof promoCodeSchema>
