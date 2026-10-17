import type { PROMO_STATUSES } from '~/data/promo-codes/status'
import type { listPromoCodes } from '~/services/promo-codes'
import type { Enums, Tables, TablesInsert } from '~/types/database'

export type PromoCodeRow = Tables<'promo_codes'>

export type PromoCodeInsert = TablesInsert<'promo_codes'>

export type DiscountType = Enums<'discount_type'>

export type PromoCodeOverview = Awaited<ReturnType<typeof listPromoCodes>>[number]

export type PromoStatus = keyof typeof PROMO_STATUSES

export type PromoCodeToggle = Pick<PromoCodeRow, 'id' | 'code' | 'active'>

export interface PromoCodeSave {
    id?: string
    values: PromoCodeInsert
}
