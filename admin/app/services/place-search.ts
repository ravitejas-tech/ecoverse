import { PLACE_SEARCH } from '~/data/events/venue'
import { toVenueSuggestion } from '~/lib/venue-map'
import { photonResponseSchema } from '~/schemas/place-search'
import type { PlaceSearchQuery, VenueSuggestion } from '~/types/venue'

export async function searchPlaces({ text, near }: PlaceSearchQuery, signal?: AbortSignal) {
    const params = new URLSearchParams({
        q: text,
        lang: PLACE_SEARCH.language,
        limit: String(PLACE_SEARCH.limit),
        bbox: PLACE_SEARCH.indiaBox,
        lat: String(near.lat),
        lon: String(near.lng),
    })
    const response = await fetch(`${PLACE_SEARCH.url}?${params}`, { signal })
    if (!response.ok) throw new Error('place_search_failed')
    const { features } = photonResponseSchema.parse(await response.json())
    const unique = new Map<string, VenueSuggestion>()
    for (const suggestion of features.map(toVenueSuggestion)) {
        if (!unique.has(suggestion.id)) unique.set(suggestion.id, suggestion)
    }
    return [...unique.values()]
}
