import 'leaflet/dist/leaflet.css'
import type { RefObject } from 'react'
import { Spinner } from '~/components/ui/spinner'
import { Text } from '~/components/ui/text'
import { VENUE_PICKER_COPY as copy } from '~/data/events/venue'
import { LOADING_LABEL } from '~/data/ui/feedback'
import type { VenueMapStatus } from '~/types/venue'

export interface VenueMapFrameProps {
    containerRef: RefObject<HTMLDivElement | null>
    status: VenueMapStatus
}

export function VenueMapFrame({ containerRef, status }: VenueMapFrameProps) {
    return (
        <div className='relative isolate h-64 overflow-hidden rounded-2xl border-2 border-border bg-surface-muted sm:h-80'>
            <div
                ref={containerRef}
                role='region'
                aria-label={copy.mapLabel}
                className='size-full'
            />
            {status !== 'ready' && (
                <div className='absolute inset-0 grid place-items-center p-6 text-center'>
                    {status === 'loading' ? (
                        <Spinner label={LOADING_LABEL} />
                    ) : (
                        <Text
                            variant='small'
                            tone='muted'>
                            {copy.mapFailed}
                        </Text>
                    )}
                </div>
            )}
        </div>
    )
}
