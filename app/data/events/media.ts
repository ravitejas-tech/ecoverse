import type { Photo } from '~/types/media'

export const FALLBACK_EVENT_PHOTO: Photo = {
    src: '/images/events/bollywood-dance-night.webp',
    alt: 'A crowd dancing together under party lights',
}

export const MAPS_DIRECTIONS = { url: 'https://www.google.com/maps/dir/', api: '1' } as const
