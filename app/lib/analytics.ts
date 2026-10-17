import type { AnalyticsWindow } from '~/types/analytics'

const analyticsWindow = () => (typeof window === 'undefined' ? {} : (window as AnalyticsWindow))

export function trackPurchase({
    bookingCode,
    value,
    eventTitle,
}: {
    bookingCode: string
    value: number
    eventTitle: string
}) {
    const { gtag, fbq } = analyticsWindow()
    gtag?.('event', 'purchase', { transaction_id: bookingCode, value, currency: 'INR', item_name: eventTitle })
    fbq?.('track', 'Purchase', { value, currency: 'INR', content_name: eventTitle })
}
