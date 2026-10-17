export const CHECKOUT_IDS = {
    form: 'checkout-form',
    tickets: 'checkout-tickets',
    details: 'checkout-details',
    summary: 'checkout-summary',
    termsError: 'terms-error',
    promo: 'promo-code',
    testPaymentTitle: 'test-payment-title',
} as const

export const buyerFieldId = (name: string) => `buyer-${name}`

export const questionFieldId = (id: string) => `question-${id}`
