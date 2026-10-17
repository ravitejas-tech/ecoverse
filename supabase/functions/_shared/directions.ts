import type { Booking } from './booking.ts'

const MAPS_DIRECTIONS = { url: 'https://www.google.com/maps/dir/', api: '1' } as const

export function directionsUrl({ venue_lat, venue_lng, map_url, venue_name, venue_address, city }: Booking['event']) {
    const pinned = venue_lat !== null && venue_lng !== null
    if (!pinned && map_url) return map_url
    const destination = pinned
        ? `${venue_lat},${venue_lng}`
        : [venue_name, venue_address, city].filter(Boolean).join(', ')
    return `${MAPS_DIRECTIONS.url}?${new URLSearchParams({ api: MAPS_DIRECTIONS.api, destination })}`
}
