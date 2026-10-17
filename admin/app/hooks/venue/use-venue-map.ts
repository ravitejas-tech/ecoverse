import { useCallback, useEffect, useEffectEvent, useRef, useState } from 'react'
import { VENUE_MAP, VENUE_PICKER_COPY, VENUE_PIN_ICON } from '~/data/events/venue'
import { loadLeaflet, venuePoint } from '~/lib/venue-map'
import type { LatLngLiteral, Map as LeafletMap, Marker } from 'leaflet'
import type { VenueMapStatus, VenuePoint } from '~/types/venue'

export interface UseVenueMapOptions {
    lat: number | null
    lng: number | null
    readOnly: boolean
    onPointChange: (point: VenuePoint) => void
}

export function useVenueMap({ lat, lng, readOnly, onPointChange }: UseVenueMapOptions) {
    const containerRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<LeafletMap | null>(null)
    const markerRef = useRef<Marker | null>(null)
    const [status, setStatus] = useState<VenueMapStatus>('loading')

    const movePin = useEffectEvent((point: LatLngLiteral) => onPointChange({ lat: point.lat, lng: point.lng }))

    const placePin = useEffectEvent(() => {
        const map = mapRef.current
        const marker = markerRef.current
        if (!map || !marker) return
        const point = venuePoint(lat, lng)
        if (!point) {
            marker.remove()
            return
        }
        marker.setLatLng(point).addTo(map)
        map.setView(point, Math.max(map.getZoom(), VENUE_MAP.pinnedZoom))
    })

    useEffect(() => {
        let cancelled = false
        let map: LeafletMap | undefined

        loadLeaflet().then(
            (leaflet) => {
                if (cancelled || !containerRef.current) return
                map = leaflet.map(containerRef.current, {
                    center: VENUE_MAP.defaultCenter,
                    zoom: VENUE_MAP.defaultZoom,
                    scrollWheelZoom: false,
                    zoomAnimation: false,
                })
                map.attributionControl.setPrefix(false)
                leaflet
                    .tileLayer(VENUE_MAP.tiles.url, {
                        attribution: VENUE_MAP.tiles.attribution,
                        maxZoom: VENUE_MAP.tiles.maxZoom,
                    })
                    .addTo(map)
                const marker = leaflet.marker(VENUE_MAP.defaultCenter, {
                    draggable: !readOnly,
                    icon: leaflet.divIcon(VENUE_PIN_ICON),
                    title: VENUE_PICKER_COPY.pinTitle,
                })
                if (!readOnly) {
                    marker.on('dragend', () => movePin(marker.getLatLng()))
                    map.on('click', (event) => movePin(event.latlng))
                }
                mapRef.current = map
                markerRef.current = marker
                placePin()
                setStatus('ready')
            },
            () => {
                if (!cancelled) setStatus('failed')
            },
        )

        return () => {
            cancelled = true
            map?.remove()
            mapRef.current = null
            markerRef.current = null
        }
    }, [readOnly])

    useEffect(() => {
        placePin()
    }, [lat, lng])

    const focus = useCallback((point: VenuePoint, zoom: number) => {
        mapRef.current?.setView(point, zoom)
    }, [])

    return { containerRef, status, focus }
}
