export const POP_FILLS = {
    pink: 'bg-pop-pink',
    yellow: 'bg-pop-yellow',
    cyan: 'bg-pop-cyan',
    lime: 'bg-pop-lime',
    violet: 'bg-pop-violet',
    orange: 'bg-pop-orange',
} as const

export type PopTone = keyof typeof POP_FILLS

export const POP_TONES = Object.keys(POP_FILLS) as PopTone[]
