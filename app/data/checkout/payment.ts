export const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js'

export const RAZORPAY_THEME_VAR = '--accent'

export const TEST_PAYMENT_COPY = {
    sticker: 'Test mode',
    title: 'Test checkout',
    body: 'No money moves. This stands in for the real payment screen.',
    pay: (amount: string) => `Pay ${amount}`,
    cancel: 'Cancel',
} as const

export const PAYMENT_TOAST = { id: 'checkout-payment' } as const

export const PAYMENT_TOASTS = {
    held: 'Seats held for you ✦',
    booked: "You're in! 🎉",
    paid: 'Payment confirmed 🎉',
    needsAttention: "We got your payment but couldn't confirm the seats. We'll sort it out.",
    dismissed: 'Payment not finished. Your seats are still held, tap Pay to try again.',
} as const
