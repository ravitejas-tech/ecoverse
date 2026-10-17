import { Badge } from '~/components/ui/badge'
import { PROMO_STATUSES } from '~/data/promo-codes/status'
import { promoStatus } from '~/lib/promo-codes'
import type { PromoCodeOverview } from '~/types/promo-codes'

export function PromoStatusBadge({ code }: { code: PromoCodeOverview }) {
    const { label, tone } = PROMO_STATUSES[promoStatus(code)]
    return <Badge tone={tone}>{label}</Badge>
}
