import { SummaryRow } from '~/components/checkout/summary/row'
import { DashedSection } from '~/components/ui/dashed-section'
import { Text } from '~/components/ui/text'
import { SUMMARY_COPY } from '~/data/checkout/summary'
import { formatRupees } from '~/lib/format'
import type { CartLine, PromoQuote } from '~/types/checkout'

export interface OrderSummaryProps {
    lines: CartLine[]
    people: number
    promo: PromoQuote | null
    total: number
}

export function OrderSummary({ lines, people, promo, total }: OrderSummaryProps) {
    if (lines.length === 0) {
        return (
            <Text
                variant='small'
                tone='muted'>
                {SUMMARY_COPY.empty}
            </Text>
        )
    }

    return (
        <dl className='space-y-2'>
            {lines.map(({ type, quantity, amount }) => (
                <SummaryRow
                    key={type.id}
                    label={SUMMARY_COPY.line(type.name, quantity)}
                    value={formatRupees(amount)}
                />
            ))}
            {promo && promo.discount > 0 && (
                <SummaryRow
                    label={SUMMARY_COPY.discount(promo.code)}
                    value={`−${formatRupees(promo.discount)}`}
                />
            )}
            <DashedSection className='space-y-1 pt-3'>
                <SummaryRow
                    label={SUMMARY_COPY.total}
                    value={formatRupees(total)}
                    emphasis
                />
                <Text
                    variant='small'
                    tone='muted'>
                    {SUMMARY_COPY.people(people)}
                </Text>
            </DashedSection>
        </dl>
    )
}
