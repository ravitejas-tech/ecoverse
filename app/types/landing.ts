import type { ConfettiShape } from '~/data/ui/confetti'
import type { PopTone } from '~/data/ui/pop-tones'
import type { Tilt } from '~/data/ui/tilts'
import type { Photo } from '~/types/media'

export interface EventPreview {
    slug: string
    title: string
    category: string
    description: string
    photo: Photo
    startsAt: string
    endsAt: string
    city: string
    region: string
    priceFrom: number
    tag: string
    tone: PopTone
}

export interface Experience {
    title: string
    emoji: string
    caption: string
    tone: PopTone
}

export interface JourneyStep {
    title: string
    emoji: string
    body: string
    tone: PopTone
}

export interface DrakeMemeContent {
    nope: string
    yep: string
}

export interface Shoutout {
    quote: string
    handle: string
    tone: PopTone
    photo: Photo
}

export interface FloatingSticker {
    label: string
    tone: PopTone
    tilt: Tilt
    placement: string
}

export interface ConfettiPiece {
    left: number
    delay: number
    duration: number
    tone: PopTone
    shape: ConfettiShape
}
