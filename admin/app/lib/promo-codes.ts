import { PROMO_CODES_COPY } from '~/data/promo-codes/copy'
import { NEW_PROMO_CODE, PROMO_ERROR_MESSAGES } from '~/data/promo-codes/defaults'
import { fromOptionalIstInput, hasPassed, toIstInput } from '~/lib/date-input'
import { errorMessage } from '~/lib/error-message'
import { formatCount, formatRupees } from '~/lib/format'
import type { PromoCodeValues } from '~/schemas/promo-code'
import type { PromoCodeInsert, PromoCodeOverview, PromoCodeRow, PromoStatus } from '~/types/promo-codes'

const { discount, uses, errors } = PROMO_CODES_COPY

export function promoUses({ stats }: Pick<PromoCodeOverview, 'stats'>) {
    return stats?.uses ?? 0
}

export function promoStatus(code: PromoCodeOverview): PromoStatus {
    if (!code.active) return 'off'
    if (hasPassed(code.expires_at)) return 'expired'
    if (code.max_uses !== null && promoUses(code) >= code.max_uses) return 'used_up'
    if (code.starts_at !== null && !hasPassed(code.starts_at)) return 'not_started'
    return 'active'
}

export function discountLabel({
    discount_type,
    discount_value,
}: Pick<PromoCodeRow, 'discount_type' | 'discount_value'>) {
    return discount_type === 'percent' ? discount.percent(discount_value) : discount.fixed(formatRupees(discount_value))
}

export function usesLabel(code: PromoCodeOverview) {
    const used = formatCount(promoUses(code))
    return code.max_uses === null ? used : uses(used, formatCount(code.max_uses))
}

export function matchesPromoSearch({ code, label, events }: PromoCodeOverview, text: string) {
    const needle = text.trim().toLowerCase()
    return [code, label, events?.title ?? ''].some((value) => value.toLowerCase().includes(needle))
}

export function promoToForm(code?: PromoCodeRow): PromoCodeValues {
    if (!code) return { ...NEW_PROMO_CODE }
    return {
        code: code.code,
        label: code.label,
        discount_type: code.discount_type,
        discount_value: code.discount_value,
        event_id: code.event_id ?? '',
        max_uses: code.max_uses?.toString() ?? '',
        starts_at: toIstInput(code.starts_at),
        expires_at: toIstInput(code.expires_at),
        active: code.active,
    }
}

export function formToPromo({
    event_id,
    max_uses,
    starts_at,
    expires_at,
    ...values
}: PromoCodeValues): PromoCodeInsert {
    return {
        ...values,
        event_id: event_id || null,
        max_uses: max_uses ? Number(max_uses) : null,
        starts_at: fromOptionalIstInput(starts_at),
        expires_at: fromOptionalIstInput(expires_at),
    }
}

export function promoErrorMessage(error: unknown) {
    return errorMessage(error, PROMO_ERROR_MESSAGES, errors.failed)
}
