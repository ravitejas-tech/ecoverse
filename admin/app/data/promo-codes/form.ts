import type { DiscountType } from '~/types/promo-codes'

export const PROMO_FORM_COPY = {
    newTitle: 'New promo code',
    newDescription: 'People type the code at checkout to get the discount.',
    editTitle: (code: string) => `Edit ${code}`,
    code: { label: 'Code', placeholder: 'RIYA10', hint: 'Letters, numbers, - or _. 3 to 24 characters.' },
    label: { label: 'Note for the team', placeholder: 'Influencer: Riya', hint: 'Only the team sees this.' },
    discountType: 'Discount type',
    discountTypes: {
        percent: { label: 'Percent off', hint: 'From 1 to 100' },
        fixed: { label: 'Rupees off', hint: 'Taken off the whole order' },
    } satisfies Record<DiscountType, { label: string; hint: string }>,
    event: { label: 'Works for', allEvents: 'All events' },
    maxUses: {
        label: 'Use limit',
        placeholder: 'No limit',
        hint: 'How many bookings can use it. Blank means no limit.',
    },
    startsAt: { label: 'Starts', hint: 'India time. Blank means right away.' },
    expiresAt: { label: 'Expires', hint: 'India time. Blank means never.' },
    active: { label: 'Turned on', description: 'People can use it at checkout.' },
    create: 'Create code',
    save: 'Save changes',
    saving: 'Saving…',
    errors: {
        code: 'Use 3 to 24 letters, numbers, - or _',
        label: 'Keep the note under 60 characters',
        value: 'Enter a whole number, 1 or more',
        percentMax: "Percent off can't be more than 100",
        maxUses: 'Enter a whole number, 1 or more, or leave it blank',
        expiresBeforeStart: 'Pick a time after the start',
    },
} as const
