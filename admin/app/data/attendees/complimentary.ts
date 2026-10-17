export const COMPLIMENTARY_FORM_ID = 'complimentary-form'

export const COMPLIMENTARY_DEFAULTS = {
    ticket_type_id: '',
    quantity: 1,
    name: '',
    email: '',
    phone: '',
    note: '',
} as const

export const COMPLIMENTARY_COPY = {
    title: 'Give free tickets',
    description: 'They get an email with their QR tickets, just like a paid booking.',
    noTickets: 'Add a ticket type first (Tickets tab).',
    fields: {
        ticket_type_id: { label: 'Ticket type', placeholder: 'Choose a ticket' },
        quantity: { label: 'How many', hint: 'Up to 20.' },
        name: { label: 'Their name', placeholder: 'Riya Sharma' },
        email: { label: 'Their email', placeholder: 'riya@example.com' },
        phone: { label: 'Their phone', placeholder: '98765 43210' },
        note: { label: 'Note for the team', hint: 'Optional, like "Partner from Red Bull".' },
    },
    submit: 'Send tickets',
    sending: 'Sending…',
    cancel: 'Cancel',
    errors: {
        ticket: 'Choose a ticket type',
        quantity: 'Between 1 and 20',
        name: 'Enter their name',
        email: 'Enter a valid email address',
        phone: 'Enter a 10-digit phone number',
        note: 'Keep the note under 200 characters',
    },
    toasts: {
        sent: (email: string) => `Free tickets sent to ${email}`,
        notEmailed: "Tickets created, but the email didn't send. Resend it from the order.",
        failed: "Couldn't create the tickets. Try again.",
    },
    serverErrors: {
        sold_out: 'Not enough tickets of that type are left.',
        ticket_unavailable: "That ticket type isn't available.",
        quantity_limit: 'Give between 1 and 20 tickets at a time.',
        invalid_name: 'Enter a name between 2 and 80 characters.',
        invalid_email: 'Enter a valid email address.',
        invalid_phone: 'Enter a phone number with 10 to 13 digits.',
        not_allowed: "You don't have access to do that.",
        event_unavailable: "This event isn't available.",
    },
} as const

export const ticketOptionLabel = (name: string, left: string) => `${name} · ${left} left`
