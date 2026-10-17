export const ATTENDEES_COPY = {
    title: 'Attendees',
    summary: (people: string, checkedIn: string) => `${people} people · ${checkedIn} checked in`,
    searchLabel: 'Search attendees',
    searchPlaceholder: 'Name, email, phone or booking ID',
    clearSearch: 'Clear search',
    filterLabel: 'Show attendees',
    download: 'Download CSV',
    giveFree: 'Give free tickets',
    caption: 'People with tickets to this event',
    checkedInAt: (time: string) => `Yes · ${time}`,
    notYet: 'Not yet',
    noAnswer: '—',
    empty: { emoji: '🎟️', title: 'No attendees yet', body: 'People show up here as soon as they book.' },
    noMatches: { emoji: '🔍', title: 'No matches', body: 'Try a different name, email or booking ID.' },
} as const

export const ATTENDEE_FILTERS = [
    { value: 'all', label: 'All' },
    { value: 'in', label: 'Checked in' },
    { value: 'out', label: 'Not yet' },
] as const

export const ATTENDEE_COLUMNS = {
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    ticket: 'Ticket',
    code: 'Ticket code',
    booking: 'Booking ID',
    checkedIn: 'Checked in',
} as const

export const ATTENDEES_FILE_SUFFIX = '-attendees'
