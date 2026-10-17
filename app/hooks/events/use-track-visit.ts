import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { captureAttribution } from '~/lib/attribution'

export function useTrackVisit(eventId: string, enabled: boolean) {
    const { pathname, search, key } = useLocation()
    const trackedKey = useRef<string | null>(null)

    useEffect(() => {
        if (!enabled || trackedKey.current === key) return
        trackedKey.current = key
        captureAttribution(search)
        void import('~/services/visits').then(({ trackVisit }) => trackVisit(pathname, eventId))
    }, [enabled, eventId, key, pathname, search])
}
