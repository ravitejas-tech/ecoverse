import type { CheckoutErrorCode } from '~/types/checkout'

export const CHECKOUT_ERROR_COPY = {
    event_unavailable: "This event isn't taking bookings any more.",
    sales_paused: 'Bookings are paused for a moment. Try again shortly.',
    invalid_name: 'Please check your name.',
    invalid_email: "That email doesn't look right.",
    invalid_phone: "That mobile number doesn't look right.",
    invalid_items: "Something in your booking didn't add up. Refresh the page and try again.",
    invalid_answers: 'Please check your answers to the questions.',
    answers_missing: 'Please answer the questions marked with *.',
    ticket_unavailable: "One of those tickets just went off sale. We've refreshed what's left.",
    quantity_limit: "That's more tickets than one booking allows. Try fewer.",
    sold_out: "Someone beat you to it and those tickets just sold out. We've refreshed what's left.",
    too_many_holds:
        "You already have a few unpaid bookings waiting. Finish one, or try again in 15 minutes when they're released.",
    promo_invalid: "That promo code doesn't work for this event.",
    promo_exhausted: 'That promo code has been fully used.',
    order_not_found: "We couldn't find that booking. Please start again.",
    payment_invalid: "We couldn't confirm that payment. If money left your account, message us and we'll sort it.",
    amount_mismatch: "We couldn't confirm that payment. If money left your account, message us and we'll sort it.",
    payment_unavailable: 'Payments are down for a moment. Try again in a minute.',
    not_allowed: "That isn't allowed from this account.",
    bad_request: "Something in your booking didn't add up. Refresh the page and try again.",
    network: 'You seem to be offline. Check your connection and try again.',
    unknown: 'Something went wrong on our side. Try again in a moment.',
} as const

export const REFRESH_AVAILABILITY_ON = ['sold_out', 'ticket_unavailable', 'sales_paused', 'event_unavailable'] as const

export const FIELD_ERROR_CODES: Partial<Record<CheckoutErrorCode, 'name' | 'email' | 'phone'>> = {
    invalid_name: 'name',
    invalid_email: 'email',
    invalid_phone: 'phone',
}

export const PROMO_ERROR_CODES = ['promo_invalid', 'promo_exhausted'] as const

export const CHECKOUT_ERROR_TITLE = "That didn't go through"
