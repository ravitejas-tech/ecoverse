import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { loadAnalyticsScripts, trackPageView } from '~/lib/analytics-scripts'
import { captureAttribution } from '~/lib/attribution'

export function Analytics() {
    const { pathname, search } = useLocation()

    useEffect(() => {
        loadAnalyticsScripts()
    }, [])

    useEffect(() => {
        captureAttribution(search)
        trackPageView(`${pathname}${search}`)
    }, [pathname, search])

    return null
}
