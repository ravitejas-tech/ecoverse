export const SLUG_MAX_LENGTH = 70

export const TITLE_LENGTH = { min: 3, max: 80 } as const

export const SUMMARY_MAX_LENGTH = 300

export const TICKET_LIMITS = {
    nameMin: 2,
    nameMax: 60,
    admitsMax: 10,
    perOrderMax: 20,
    complimentaryMax: 20,
} as const

export const SATURDAY = 6

export const NEW_EVENT_TIMES = { start: '20:00', end: '23:00' } as const

export const CUSTOM_QUESTION_PREFIX = 'custom-'
