export const SIGN_IN_COPY = {
    sticker: 'No password needed',
    title: 'Log in with a code',
    lead: 'We email you a 6-digit code. Use the email you booked with.',
    emailLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    emailError: 'Enter an email like name@example.com.',
    sendCode: 'Email me a login code',
    codeLabel: 'Login code',
    codePlaceholder: '123456',
    codeHint: (email: string) => `We sent a 6-digit code to ${email}. It can take a minute to arrive.`,
    codeError: 'Enter the 6-digit code from the email.',
    verify: 'Log in',
    resend: 'Send a new code',
    resendIn: (seconds: number) => `New code in ${seconds}s`,
    changeEmail: 'Use a different email',
} as const

export const SIGN_IN_IDS = {
    email: 'sign-in-email',
    code: 'sign-in-code',
    title: 'sign-in-title',
} as const

export const SIGN_IN_TOAST = { id: 'account-sign-in' } as const

export const SIGN_IN_TOASTS = {
    codeSent: 'Code sent! Check your inbox.',
    signedIn: "You're logged in 🎉",
    signedOut: 'Logged out. See you soon!',
} as const
