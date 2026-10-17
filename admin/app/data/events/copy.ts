import { DB_ERROR_CODES } from '~/data/ui/db-errors'

export const EVENTS_COPY = {
    title: 'Events',
    description: 'Create events, sell tickets and see who is coming.',
    newEvent: 'New event',
    filterLabel: 'Show events',
    searchLabel: 'Search events',
    searchPlaceholder: 'Search by name or city',
    clearSearch: 'Clear search',
    empty: {
        upcoming: {
            emoji: '🎉',
            title: 'Nothing live right now',
            body: 'Published events that have not happened yet show up here.',
        },
        drafts: { emoji: '📝', title: 'No drafts', body: 'Events you are still working on show up here.' },
        past: { emoji: '📸', title: 'No past events yet', body: 'Events that are over show up here.' },
        search: { emoji: '🔍', title: 'No matches', body: 'Try a different name or city.' },
    },
    noCover: 'No cover photo',
    sold: (sold: string, capacity: string) => `${sold} of ${capacity} sold`,
    noTickets: 'No tickets yet',
    money: (amount: string) => `${amount} in`,
    open: 'Open',
    duplicate: 'Duplicate',
    viewLive: 'View on website',
    copyPreview: 'Copy preview link',
    moreActions: 'More actions',
} as const

export const EVENT_BADGES = {
    draft: 'Draft',
    published: 'Live',
    paused: 'Sales paused',
    over: 'Over',
} as const

export const EVENT_HEADER_COPY = {
    back: 'All events',
    tabsLabel: 'Event sections',
    tabs: { details: 'Details', tickets: 'Tickets', questions: 'Questions', attendees: 'Attendees' },
    publish: 'Publish',
    unpublish: 'Unpublish',
    pause: 'Pause sales',
    resume: 'Resume sales',
    preview: 'Preview',
    viewLive: 'View live',
    duplicate: 'Duplicate',
    notFound: { emoji: '🤷', title: 'Event not found', body: 'It may have been deleted. Head back to the list.' },
    blockers: {
        title: 'Almost ready to publish',
        description: 'Fix these first:',
        close: 'Got it',
        noTickets: 'Add at least one ticket type that is shown on the website (Tickets tab).',
        noCover: 'Add a cover photo with a description (Details tab).',
        noSummary: 'Add a short summary (Details tab).',
        noVenue: 'Add the venue (Details tab).',
    },
    unpublishConfirm: {
        title: 'Unpublish this event?',
        description: 'It disappears from the website and nobody can book. Existing tickets still work.',
        confirm: 'Unpublish',
    },
    pauseConfirm: {
        title: 'Pause ticket sales?',
        description: 'The event stays on the website, but nobody can book until you resume.',
        confirm: 'Pause sales',
    },
} as const

export const EVENT_TOASTS = {
    created: 'Draft created',
    coverFailed: "The event is saved, but the photo didn't upload. Try again from the Details tab.",
    saved: 'Changes saved',
    published: 'Published! It is live on the website.',
    unpublished: 'Unpublished. It is hidden from the website.',
    paused: 'Ticket sales paused',
    resumed: 'Ticket sales are back on',
    questionsSaved: 'Questions saved',
    duplicated: 'Copy created as a draft',
    coverUploaded: 'Photo uploaded. Save to keep it.',
    failed: "Couldn't save. Try again.",
    uploadFailed: "Couldn't upload that photo. Try a JPG or PNG under 5 MB.",
    duplicateFailed: "Couldn't duplicate the event. Try again.",
} as const

export const EVENT_DB_ERRORS = {
    [DB_ERROR_CODES.uniqueViolation]: 'That web address is taken. Try another one.',
    events_ends_after_start: 'It has to end after it starts.',
    not_allowed: "You don't have access to do that.",
} as const

export const NEW_EVENT_COPY = {
    title: 'New event',
    description: 'Just the basics for now. You can add the rest after.',
    sections: { what: 'What', when: 'When', where: 'Where', cover: 'Cover photo' },
    submit: 'Create draft',
    submitting: 'Creating…',
    cancel: 'Cancel',
    pickPhoto: 'Choose photo',
    changePhoto: 'Change photo',
    removePhoto: 'Remove',
    coverOptional: 'Optional. You can add it later.',
} as const
