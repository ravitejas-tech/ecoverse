import { ANALYTICS_SCRIPTS, META_PIXEL_VERSION } from '~/data/layout/analytics'
import type { AnalyticsWindow, MetaPixelStub } from '~/types/analytics'

function injectScript(src: string) {
    const script = document.createElement('script')
    script.async = true
    script.src = src
    document.head.append(script)
}

function loadGoogleAnalytics(target: AnalyticsWindow, measurementId: string) {
    const dataLayer = (target.dataLayer ??= [])
    target.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        dataLayer.push(arguments)
    }
    target.gtag('js', new Date())
    target.gtag('config', measurementId, { send_page_view: false })
    injectScript(`${ANALYTICS_SCRIPTS.googleAnalytics}?id=${encodeURIComponent(measurementId)}`)
}

function loadMetaPixel(target: AnalyticsWindow, pixelId: string) {
    const pixel: MetaPixelStub = Object.assign(
        (...args: unknown[]) => (pixel.callMethod ? pixel.callMethod(...args) : pixel.queue.push(args)),
        { queue: [], push: undefined, loaded: true, version: META_PIXEL_VERSION },
    )
    pixel.push = pixel
    target.fbq = pixel
    target._fbq = pixel
    injectScript(ANALYTICS_SCRIPTS.metaPixel)
    pixel('init', pixelId)
}

export function loadAnalyticsScripts() {
    const target = window as AnalyticsWindow
    const { VITE_GA_MEASUREMENT_ID: measurementId, VITE_META_PIXEL_ID: pixelId } = import.meta.env
    if (measurementId && !target.gtag) loadGoogleAnalytics(target, measurementId)
    if (pixelId && !target.fbq) loadMetaPixel(target, pixelId)
}

export function trackPageView(path: string) {
    const { gtag, fbq } = window as AnalyticsWindow
    gtag?.('event', 'page_view', { page_path: path, page_location: location.href, page_title: document.title })
    fbq?.('track', 'PageView')
}
