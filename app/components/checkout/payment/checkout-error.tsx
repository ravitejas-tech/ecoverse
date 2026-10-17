import { CircleAlert } from 'lucide-react'
import { Notice } from '~/components/ui/notice'
import { CHECKOUT_ERROR_TITLE } from '~/data/checkout/errors'
import { checkoutErrorMessage } from '~/lib/checkout/errors'

export function CheckoutError({ error }: { error: Error | null }) {
    if (!error) return null

    return (
        <Notice
            tone='pink'
            icon={CircleAlert}
            title={CHECKOUT_ERROR_TITLE}
            body={checkoutErrorMessage(error)}
            live='assertive'
        />
    )
}
