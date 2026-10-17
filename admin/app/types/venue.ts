import type { z } from 'zod'
import type { EventFormValues } from '~/schemas/event'
import type { photonFeatureSchema } from '~/schemas/place-search'

export interface VenuePoint {
    lat: number
    lng: number
}

export interface VenueSuggestion {
    id: string
    name: string
    area: string
    address: string
    point: VenuePoint
    exact: boolean
}

export interface PlaceSearchQuery {
    text: string
    near: VenuePoint
}

export type PhotonFeature = z.infer<typeof photonFeatureSchema>

export type VenueMapStatus = 'loading' | 'ready' | 'failed'

export type VenueFields = Pick<EventFormValues, 'venue_name' | 'venue_address' | 'venue_lat' | 'venue_lng'>
