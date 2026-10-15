export const TILTS = {
    none: '',
    left: '-rotate-2',
    right: 'rotate-2',
    'hard-left': '-rotate-6',
    'hard-right': 'rotate-6',
} as const

export type Tilt = keyof typeof TILTS
