import { keepPreviousData } from '@tanstack/react-query'
import { createQuery } from 'react-query-kit'
import { searchPlaces } from '~/services/place-search'
import type { PlaceSearchQuery } from '~/types/venue'

export const useVenueSuggestions = createQuery({
    queryKey: ['venue-suggestions'],
    fetcher: (query: PlaceSearchQuery, { signal }) => searchPlaces(query, signal),
    placeholderData: keepPreviousData,
})
