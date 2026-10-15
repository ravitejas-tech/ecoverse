import type { Options } from 'canvas-confetti'

export const CONFETTI_COLOR_VARS = [
    '--pop-pink',
    '--pop-yellow',
    '--pop-cyan',
    '--pop-lime',
    '--pop-violet',
    '--pop-orange',
] as const

export const CONFETTI_BURST: Options = {
    particleCount: 130,
    spread: 85,
    startVelocity: 42,
    ticks: 240,
    scalar: 1.1,
    disableForReducedMotion: true,
}

export const CONFETTI_WELCOME: Options = {
    particleCount: 90,
    spread: 120,
    origin: { x: 0.5, y: 0.3 },
}

export const CONFETTI_SHAPES = {
    square: 'size-2.5 rounded-xs',
    strip: 'h-4 w-1.5 rounded-full',
    dot: 'size-2 rounded-full',
} as const

export type ConfettiShape = keyof typeof CONFETTI_SHAPES
