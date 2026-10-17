import { CheckoutError } from '~/components/checkout/payment/checkout-error'
import { HoldNotice } from '~/components/checkout/payment/hold-notice'
import { PayButton } from '~/components/checkout/payment/pay-button'
import { OrderSummary } from '~/components/checkout/summary/order-summary'
import { PromoCode } from '~/components/checkout/summary/promo-code'
import { Text } from '~/components/ui/text'
import { SUMMARY_COPY } from '~/data/checkout/summary'
import type { usePromo } from '~/hooks/checkout/use-promo'
import type { CartLine } from '~/types/checkout'

export interface SummaryPanelProps {
    lines: CartLine[]
    people: number
    total: number
    promo: ReturnType<typeof usePromo>
    holdExpiresAt: string | null
    busy: boolean
    error: Error | null
}

export function SummaryPanel({ lines, people, total, promo, holdExpiresAt, busy, error }: SummaryPanelProps) {
    return (
        <div className='space-y-5'>
            <PromoCode
                applied={promo.applied}
                checking={promo.checking}
                error={promo.error}
                onApply={promo.apply}
                onRemove={promo.remove}
            />
            <OrderSummary
                lines={lines}
                people={people}
                promo={promo.applied}
                total={total}
            />
            {holdExpiresAt && <HoldNotice holdExpiresAt={holdExpiresAt} />}
            <CheckoutError error={error} />
            <div className='hidden space-y-3 lg:block'>
                <PayButton
                    total={total}
                    empty={lines.length === 0}
                    busy={busy}
                />
                <Text
                    variant='small'
                    tone='muted'
                    className='text-center'>
                    {SUMMARY_COPY.paymentMethods}
                </Text>
            </div>
        </div>
    )
}
