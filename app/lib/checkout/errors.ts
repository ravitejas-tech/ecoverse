import { CHECKOUT_ERROR_COPY } from '~/data/checkout/errors'
import type { CheckoutErrorCode } from '~/types/checkout'

const isCheckoutErrorCode = (code: string): code is CheckoutErrorCode => Object.hasOwn(CHECKOUT_ERROR_COPY, code)

export function checkoutErrorCode(error: unknown): CheckoutErrorCode {
    const code = error instanceof Error ? error.message : ''
    return isCheckoutErrorCode(code) ? code : 'unknown'
}

export const checkoutErrorMessage = (error: unknown) => CHECKOUT_ERROR_COPY[checkoutErrorCode(error)]
