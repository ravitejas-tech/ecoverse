import { HoldNotice } from '~/components/checkout/payment/hold-notice'
import { PayButton, type PayButtonProps } from '~/components/checkout/payment/pay-button'
import { Text } from '~/components/ui/text'
import { SUMMARY_COPY } from '~/data/checkout/summary'
import { formatRupees } from '~/lib/format'

export interface PayBarProps extends Omit<PayButtonProps, 'className'> {
    holdExpiresAt: string | null
}

export function PayBar({ total, empty, busy, holdExpiresAt }: PayBarProps) {
    return (
        <div className='sticky bottom-0 z-30 -mx-5 mt-6 border-t-2 border-border bg-bg/90 px-5 pt-3 backdrop-blur-md md:-mx-8 md:px-8 pb-safe lg:hidden'>
            {holdExpiresAt && (
                <HoldNotice
                    holdExpiresAt={holdExpiresAt}
                    compact
                />
            )}
            <div className='flex items-center gap-4'>
                <div className='shrink-0'>
                    <Text variant='meta'>{SUMMARY_COPY.total}</Text>
                    <Text variant='price'>{formatRupees(total)}</Text>
                </div>
                <PayButton
                    total={total}
                    empty={empty}
                    busy={busy}
                    className='min-w-0 flex-1'
                />
            </div>
        </div>
    )
}
