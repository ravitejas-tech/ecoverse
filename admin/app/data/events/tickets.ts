import type { TicketPreset } from '~/types/ticket-types'

export const TICKET_PRESETS: readonly TicketPreset[] = [
    { name: 'Early Bird', price: 399, quantity: 50, admits: 1, description: 'Limited seats at the best price.' },
    { name: 'Regular', price: 499, quantity: 100, admits: 1, description: '' },
    { name: 'Couple Pass', price: 899, quantity: 25, admits: 2, description: 'Entry for two people.' },
    { name: 'Group of 4', price: 1599, quantity: 10, admits: 4, description: 'Entry for four people.' },
    { name: 'VIP', price: 999, quantity: 20, admits: 1, description: 'Front-row spot and a welcome drink.' },
]

export const NEW_TICKET_DEFAULTS = {
    name: '',
    description: '',
    price: 499,
    quantity: 100,
    admits: 1,
    min_per_order: 1,
    max_per_order: 10,
    sales_start: '',
    sales_end: '',
    visible: true,
    sold_out: false,
} as const

export const TICKET_STATE_TONES = {
    on_sale: 'lime',
    hidden: 'muted',
    sold_out: 'pink',
    not_started: 'cyan',
    ended: 'muted',
} as const

export const TICKETS_COPY = {
    title: 'Ticket types',
    add: 'Add ticket type',
    quickStart: 'Quick start',
    quickStartLead: 'Tap one to fill in the details, then change anything you like.',
    empty: { emoji: '🎟️', title: 'No tickets yet', body: 'Add at least one ticket type before you publish.' },
    createdTitle: 'Saved as a draft. Next: add tickets.',
    createdBody: 'Pick a quick start below or add your own. Nobody sees this event until you publish it.',
    price: 'Price',
    free: 'Free',
    booked: (booked: string, total: string) => `${booked} of ${total} booked`,
    left: (left: string) => `${left} left`,
    admits: (people: number) => `Admits ${people}`,
    perOrder: (min: number, max: number) => `${min}–${max} per order`,
    states: {
        on_sale: 'On sale',
        hidden: 'Hidden',
        sold_out: 'Sold out',
        not_started: 'Not on sale yet',
        ended: 'Sales closed',
    },
    opensAt: (when: string) => `Opens ${when}`,
    closesAt: (when: string) => `Closes ${when}`,
    edit: 'Edit',
    remove: 'Delete',
    deleteTitle: 'Delete this ticket type?',
    deleteBody: "It's removed from the event. This can't be undone.",
    deleteConfirm: 'Delete',
    dialog: {
        addTitle: 'Add ticket type',
        editTitle: 'Edit ticket type',
        save: 'Save ticket',
        saving: 'Saving…',
        cancel: 'Cancel',
    },
    fields: {
        name: { label: 'Name', placeholder: 'Early Bird' },
        description: { label: 'Description', hint: 'Optional. One line on what is included.' },
        price: { label: 'Price (₹)', hint: '0 makes it free.' },
        quantity: { label: 'How many to sell' },
        admits: { label: 'People per ticket', hint: '2 for a couple pass, 4 for a group.' },
        min_per_order: { label: 'Min per order' },
        max_per_order: { label: 'Max per order' },
        sales_start: { label: 'Sales open', hint: 'Optional, India time. Empty means right away.' },
        sales_end: { label: 'Sales close', hint: 'Optional, India time. Empty means until the event.' },
        visible: { label: 'Show on the website', description: 'Turn off to hide it without deleting it.' },
        sold_out: { label: 'Mark as sold out', description: 'Stops sales for this ticket straight away.' },
    },
    errors: {
        name: 'Give the ticket a name (2–60 characters)',
        price: 'Enter a price in rupees',
        quantity: 'Enter how many to sell',
        admits: 'Between 1 and 10 people',
        perOrder: 'Between 1 and 20',
        maxBelowMin: 'Max has to be at least the min',
        windowOrder: 'Sales have to close after they open',
        description: 'Keep it under 200 characters',
    },
    toasts: {
        saved: 'Ticket saved',
        deleted: 'Ticket deleted',
        moved: 'Order updated',
        failed: "Couldn't save the ticket. Try again.",
        inUse: "People have booked this ticket, so it can't be deleted. Hide it instead.",
    },
} as const

export const TICKET_FORM_ID = 'ticket-type-form'
