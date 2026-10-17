import { useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { VenueMapFrame } from '~/components/events/venue/venue-map-frame'
import { VenuePinStatus } from '~/components/events/venue/venue-pin-status'
import { VenueSearch } from '~/components/events/venue/venue-search'
import { VENUE_MAP } from '~/data/events/venue'
import { useVenueMap } from '~/hooks/venue/use-venue-map'
import { venuePoint } from '~/lib/venue-map'
import type { VenueFields, VenuePoint, VenueSuggestion } from '~/types/venue'

const DIRTY = { shouldDirty: true, shouldValidate: true } as const

export function VenuePicker({ readOnly = false }: { readOnly?: boolean }) {
    const { control, setValue } = useFormContext<VenueFields>()
    const [lat, lng] = useWatch({ control, name: ['venue_lat', 'venue_lng'] })
    const [needsTap, setNeedsTap] = useState(false)

    const setPin = (point: VenuePoint | null) => {
        setValue('venue_lat', point?.lat ?? null, DIRTY)
        setValue('venue_lng', point?.lng ?? null, DIRTY)
        setNeedsTap(false)
    }

    const { containerRef, status, focus } = useVenueMap({ lat, lng, readOnly, onPointChange: setPin })

    const choose = ({ exact, name, address, point }: VenueSuggestion) => {
        if (!exact) {
            focus(point, VENUE_MAP.areaZoom)
            setNeedsTap(true)
            return
        }
        setValue('venue_name', name, DIRTY)
        if (address) setValue('venue_address', address, DIRTY)
        setPin(point)
    }

    return (
        <div className='space-y-3'>
            <VenueSearch
                disabled={readOnly}
                near={venuePoint(lat, lng) ?? VENUE_MAP.defaultCenter}
                onPick={choose}
            />
            <VenueMapFrame
                containerRef={containerRef}
                status={status}
            />
            <VenuePinStatus
                pinned={lat !== null}
                needsTap={needsTap}
                readOnly={readOnly}
                onRemove={() => setPin(null)}
            />
        </div>
    )
}
