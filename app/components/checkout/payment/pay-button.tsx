import { Button } from '~/components/ui/button'
import { Spinner } from '~/components/ui/spinner'
import { CHECKOUT_IDS } from '~/data/checkout/ids'
import { PAY_COPY } from '~/data/checkout/summary'
import { formatRupees } from '~/lib/format'
import { cn } from '~/lib/utils'

export interface PayButtonProps {
    total: number
    empty: boolean
    busy: boolean
    className?: string
}

function payLabel(total: number, empty: boolean) {
    if (empty) return PAY_COPY.pickFirst
    return total === 0 ? PAY_COPY.free : PAY_COPY.pay(formatRupees(total))
}

export function PayButton({ total, empty, busy, className }: PayButtonProps) {
    return (
        <Button
            type='submit'
            form={CHECKOUT_IDS.form}
            size='lg'
            disabled={empty || busy}
            aria-busy={busy}
            className={cn('w-full', className)}>
            {busy && <Spinner />}
            {busy ? PAY_COPY.busy : payLabel(total, empty)}
        </Button>
    )
}
