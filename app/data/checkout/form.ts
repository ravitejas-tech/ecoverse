import { PHONE_COUNTRY_CODE } from '~/data/checkout/limits'
import type { BuyerFieldConfig } from '~/types/checkout'

export const BUYER_FIELDS: BuyerFieldConfig[] = [
    {
        name: 'name',
        label: 'Full name',
        placeholder: 'Riya Sharma',
        type: 'text',
        autoComplete: 'name',
        inputMode: 'text',
        autoCapitalize: 'words',
    },
    {
        name: 'phone',
        label: 'Mobile number',
        hint: '10 digits. We only call if plans change.',
        placeholder: '98765 43210',
        prefix: PHONE_COUNTRY_CODE,
        type: 'tel',
        autoComplete: 'tel-national',
        inputMode: 'tel',
    },
    {
        name: 'email',
        label: 'Email',
        hint: 'We send your tickets here.',
        placeholder: 'you@example.com',
        type: 'email',
        autoComplete: 'email',
        inputMode: 'email',
    },
]

export const FORM_COPY = {
    detailsLead: 'No account needed. Just who is coming and where to send the tickets.',
    required: 'Required',
    requiredLegend: '* means we need this one',
    optional: 'optional',
    selectPlaceholder: 'Choose one',
} as const

export const FORM_ERRORS = {
    name: 'Please enter your name.',
    phone: 'Enter a 10-digit mobile number, like 98765 43210.',
    email: 'Enter an email like name@example.com.',
    age: 'Enter your age in years.',
    answer: 'Please answer this one.',
    choice: 'Please pick one.',
    contactPhone: 'Enter a 10-digit phone number.',
    tooLong: 'That is a bit long. Keep it short.',
    terms: 'Please agree to the terms to continue.',
} as const

export const CONSENT_COPY = {
    terms: { before: 'I agree to the ', terms: 'terms', between: ' and ', refund: 'refund policy' },
    marketing: 'Send me news about upcoming Echoverse events',
    newTab: ' (opens in a new tab)',
} as const
