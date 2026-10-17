import { PLACE_SEARCH } from '~/data/events/venue'
import type { PhotonFeature, VenuePoint, VenueSuggestion } from '~/types/venue'

export async function loadLeaflet() {
    const leaflet = await import('leaflet')
    return 'default' in leaflet ? (leaflet.default as typeof leaflet) : leaflet
}

export function venuePoint(lat: number | null, lng: number | null): VenuePoint | null {
    return lat !== null && lng !== null ? { lat, lng } : null
}

const joinParts = (parts: readonly (string | undefined)[]) => [...new Set(parts.filter(Boolean))].join(', ')

export function toVenueSuggestion({ geometry, properties }: PhotonFeature): VenueSuggestion {
    const { osm_type, osm_id, type, name, housenumber, street, locality, district, city, county, state, postcode } =
        properties
    const [lng, lat] = geometry.coordinates
    const streetLine = [housenumber, street].filter(Boolean).join(' ')
    const neighbourhood = locality ?? district
    const town = city ?? county
    const area = joinParts([neighbourhood, town, state])

    return {
        id: osm_id ? `${osm_type ?? ''}${osm_id}` : `${lat},${lng}`,
        name: name ?? (streetLine || area),
        area,
        address: joinParts([streetLine, neighbourhood, town, [state, postcode].filter(Boolean).join(' ')]),
        point: { lat, lng },
        exact: Boolean(name) && PLACE_SEARCH.exactTypes.some((exactType) => exactType === type),
    }
}
