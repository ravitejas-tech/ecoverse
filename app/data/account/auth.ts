export const AUTH_STORAGE_KEY = 'echoverse-auth'

export const LOGIN_CODE_LENGTH = 6

export const RESEND_CODE_AFTER_SECONDS = 30

export const AUTH_ERROR_CODES: Record<string, AccountErrorCodeName> = {
    otp_expired: 'invalid_code',
    otp_disabled: 'unavailable',
    over_email_send_rate_limit: 'rate_limited',
    over_request_rate_limit: 'rate_limited',
    email_address_invalid: 'invalid_email',
    validation_failed: 'invalid_email',
}

export const ACCOUNT_ERROR_COPY = {
    invalid_code: "That code didn't work. Check it, or ask for a new one.",
    rate_limited: 'Too many tries. Wait a minute and try again.',
    invalid_email: "That email doesn't look right.",
    unavailable: "Logging in isn't available right now. Try again soon.",
    network: 'You seem to be offline. Check your connection and try again.',
    unknown: 'Something went wrong on our side. Try again in a moment.',
} as const

export type AccountErrorCodeName = keyof typeof ACCOUNT_ERROR_COPY
