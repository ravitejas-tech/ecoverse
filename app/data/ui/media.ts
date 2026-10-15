export const PHOTO_SHAPES = {
    square: {
        width: 720,
        height: 720,
        smallerWidths: [360],
        sizes: '(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 80vw',
    },
    banner: {
        width: 960,
        height: 540,
        smallerWidths: [480, 720],
        sizes: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 80vw',
    },
} as const

export type PhotoShape = keyof typeof PHOTO_SHAPES
