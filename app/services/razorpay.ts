import { BRAND_NAME } from '~/data/brand'
import { RAZORPAY_SCRIPT_URL, RAZORPAY_THEME_VAR } from '~/data/checkout/payment'
import { readCssVar } from '~/lib/css'
import type { RazorpayCheckoutRequest, RazorpayResponse, RazorpayWindow } from '~/types/checkout'

let scriptLoad: Promise<void> | null = null

function loadRazorpay() {
    scriptLoad ??= new Promise<void>((resolve, reject) => {
        const script = Object.assign(document.createElement('script'), { src: RAZORPAY_SCRIPT_URL, async: true })
        script.onload = () => resolve()
        script.onerror = () => {
            scriptLoad = null
            script.remove()
            reject(new Error('payment_unavailable'))
        }
        document.head.append(script)
    })
    return scriptLoad
}

export async function openRazorpayCheckout({ payment, description, prefill }: RazorpayCheckoutRequest) {
    await loadRazorpay()
    const { Razorpay } = window as RazorpayWindow
    if (!Razorpay) throw new Error('payment_unavailable')
    return new Promise<RazorpayResponse | null>((resolve) => {
        new Razorpay({
            key: payment.keyId,
            order_id: payment.providerOrderId,
            amount: payment.amount,
            currency: payment.currency,
            name: BRAND_NAME,
            description,
            prefill,
            theme: { color: readCssVar(RAZORPAY_THEME_VAR) },
            modal: { ondismiss: () => resolve(null) },
            handler: resolve,
        }).open()
    })
}
