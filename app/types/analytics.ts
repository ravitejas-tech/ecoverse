export type AnalyticsParams = Record<string, string | number | boolean | undefined>

export type MetaPixelStub = ((...args: unknown[]) => void) & {
    callMethod?: (...args: unknown[]) => void
    queue: unknown[]
    push: unknown
    loaded: boolean
    version: string
}

export interface AnalyticsWindow {
    gtag?: (command: 'event' | 'config' | 'js', name: string | Date, params?: AnalyticsParams) => void
    fbq?: (command: 'track' | 'trackCustom' | 'init', name: string, params?: AnalyticsParams) => void
    dataLayer?: unknown[]
    _fbq?: MetaPixelStub
}
