import { toast } from 'react-hot-toast'
import { createMutation } from 'react-query-kit'
import { PAYMENT_TOAST, PAYMENT_TOASTS } from '~/data/checkout/payment'
import { checkoutErrorMessage } from '~/lib/checkout/errors'
import { createOrder, verifyPayment } from '~/services/orders'
import { openRazorpayCheckout } from '~/services/razorpay'

const toastCheckoutError = (error: Error) => toast.error(checkoutErrorMessage(error), PAYMENT_TOAST)

export const useCreateOrder = createMutation({
    mutationKey: ['checkout', 'create-order'],
    mutationFn: createOrder,
    onSuccess: ({ payment }) =>
        toast.success(payment.provider === 'free' ? PAYMENT_TOASTS.booked : PAYMENT_TOASTS.held, PAYMENT_TOAST),
    onError: toastCheckoutError,
})

export const useRazorpayCheckout = createMutation({
    mutationKey: ['checkout', 'razorpay'],
    mutationFn: openRazorpayCheckout,
    onSuccess: (response) => {
        if (!response) toast(PAYMENT_TOASTS.dismissed, PAYMENT_TOAST)
    },
    onError: toastCheckoutError,
})

export const useVerifyPayment = createMutation({
    mutationKey: ['checkout', 'verify-payment'],
    mutationFn: verifyPayment,
    onSuccess: ({ status }) =>
        status === 'paid'
            ? toast.success(PAYMENT_TOASTS.paid, PAYMENT_TOAST)
            : toast.error(PAYMENT_TOASTS.needsAttention, PAYMENT_TOAST),
    onError: toastCheckoutError,
})
