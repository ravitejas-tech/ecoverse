import { useMemo } from 'react'
import { data } from 'react-router'
import { CheckoutBlocked } from '~/components/checkout/blocked'
import { CheckoutPage } from '~/components/checkout/page'
import { CheckoutSkeleton } from '~/components/checkout/skeleton'
import { QueryProvider } from '~/components/ui/query-provider'
import { CHECKOUT_META } from '~/data/checkout/page'
import { eventBookingPath } from '~/data/navigation'
import { blockedState, ticketOptions } from '~/lib/checkout/ticket-options'
import { formatEventDay } from '~/lib/format'
import { buildPageMeta } from '~/lib/seo/meta'
import { getPublishedEvent, getTicketAvailability } from '~/services/events'
import type { Route } from './+types/$slug.book'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    const event = await getPublishedEvent(params.slug)
    if (!event) throw data(null, { status: 404 })
    return { event, availability: await getTicketAvailability([event.id]), loadedAt: Date.now() }
}

export function HydrateFallback() {
    return <CheckoutSkeleton />
}

export const meta: Route.MetaFunction = ({ loaderData, params }) =>
    buildPageMeta({
        title: loaderData ? CHECKOUT_META.title(loaderData.event.title) : CHECKOUT_META.fallbackTitle,
        description: CHECKOUT_META.description,
        path: eventBookingPath(params.slug),
        robots: CHECKOUT_META.robots,
    })

export default function BookEvent({ loaderData: { event, availability, loadedAt } }: Route.ComponentProps) {
    const options = useMemo(() => ticketOptions(event, availability, loadedAt), [event, availability, loadedAt])
    const { reason, opensAt } = blockedState(event, availability, loadedAt)

    if (reason) {
        return (
            <CheckoutBlocked
                event={event}
                reason={reason}
                opensOn={opensAt ? formatEventDay(opensAt) : ''}
            />
        )
    }

    return (
        <QueryProvider>
            <CheckoutPage
                key={event.id}
                event={event}
                options={options}
            />
        </QueryProvider>
    )
}
