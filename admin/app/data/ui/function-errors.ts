export const FUNCTION_ERROR_CODES = [
    'order_not_found',
    'order_not_refundable',
    'order_not_cancellable',
    'not_allowed',
    'payment_unavailable',
    'invalid_email',
    'invalid_name',
    'bad_request',
    'unknown',
] as const

export const UNKNOWN_FUNCTION_ERROR = 'unknown'

export const FUNCTION_ERROR_MESSAGES = {
    order_not_found: "We couldn't find that order, or it has no tickets to send.",
    order_not_refundable: "This order can't be refunded.",
    order_not_cancellable: "This order can't be cancelled.",
    not_allowed: "You don't have access to do that.",
    payment_unavailable: "The payment provider isn't reachable right now. Try again in a minute.",
    invalid_email: 'Enter a valid email address.',
    invalid_name: 'Enter a name between 2 and 80 characters.',
    bad_request: 'Something in the request looks wrong. Check it and try again.',
    unknown: 'Something went wrong. Try again.',
} as const satisfies Record<(typeof FUNCTION_ERROR_CODES)[number], string>
