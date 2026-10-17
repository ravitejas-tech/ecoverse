import { Button } from '~/components/ui/button'
import { Sheet } from '~/components/ui/sheet'
import { Spinner } from '~/components/ui/spinner'
import { Sticker } from '~/components/ui/sticker'
import { Text } from '~/components/ui/text'
import { CHECKOUT_IDS } from '~/data/checkout/ids'
import { TEST_PAYMENT_COPY } from '~/data/checkout/payment'
import { formatRupees } from '~/lib/format'

export interface TestPaymentSheetProps {
    open: boolean
    total: number
    paying: boolean
    onPay: () => void
    onClose: () => void
}

export function TestPaymentSheet({ open, total, paying, onPay, onClose }: TestPaymentSheetProps) {
    const amount = formatRupees(total)

    return (
        <Sheet
            open={open}
            onClose={onClose}
            labelledBy={CHECKOUT_IDS.testPaymentTitle}
            dismissible={!paying}>
            <div className='space-y-5 p-6 pb-10 sm:pb-6'>
                <Sticker
                    tone='yellow'
                    tilt='left'>
                    {TEST_PAYMENT_COPY.sticker}
                </Sticker>
                <div className='space-y-2'>
                    <Text
                        as='h2'
                        id={CHECKOUT_IDS.testPaymentTitle}
                        variant='heading'>
                        {TEST_PAYMENT_COPY.title}
                    </Text>
                    <Text
                        variant='small'
                        tone='secondary'>
                        {TEST_PAYMENT_COPY.body}
                    </Text>
                </div>
                <div className='grid gap-3'>
                    <Button
                        type='button'
                        size='lg'
                        onClick={onPay}
                        disabled={paying}
                        aria-busy={paying}>
                        {paying && <Spinner />}
                        {TEST_PAYMENT_COPY.pay(amount)}
                    </Button>
                    <Button
                        type='button'
                        variant='secondary'
                        onClick={onClose}
                        disabled={paying}>
                        {TEST_PAYMENT_COPY.cancel}
                    </Button>
                </div>
            </div>
        </Sheet>
    )
}
