export const PROMO_COPY = {
    toggle: 'Have a promo code?',
    label: 'Promo code',
    placeholder: 'ECHO10',
    apply: 'Apply',
    remove: 'Remove',
    removeLabel: (code: string) => `Remove promo code ${code}`,
    applied: (code: string, amount: string) => `${code} applied −${amount}`,
    appliedNoAmount: (code: string) => `${code} applied`,
    invalidFormat: 'Promo codes are 3 to 24 letters or numbers.',
} as const

export const SUMMARY_COPY = {
    empty: 'Your tickets show up here.',
    line: (name: string, quantity: number) => `${name} × ${quantity}`,
    subtotal: 'Subtotal',
    discount: (code: string) => `Promo ${code}`,
    total: 'Total',
    people: (count: number) => (count === 1 ? 'Entry for 1 person' : `Entry for ${count} people`),
    paymentMethods: 'UPI, cards and net banking',
} as const

export const PAY_COPY = {
    pay: (amount: string) => `Pay ${amount}`,
    free: 'Get my tickets',
    pickFirst: 'Pick a ticket first',
    busy: 'Hold on…',
} as const

export const HOLD_COPY = {
    holding: (time: string) => `We're holding your seats · ${time}`,
    holdingHint: 'Finish paying before the timer runs out.',
    expired: 'Your seat hold ran out',
    expiredHint: 'Tap Pay to grab them again if they are still free.',
} as const
