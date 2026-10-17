import { data } from 'react-router'
import { EventPage } from '~/components/events/detail/event-page'
import { EventPageSkeleton } from '~/components/events/detail/event-page-skeleton'
import { PREVIEW_PARAM } from '~/data/events/page'
import { useTrackVisit } from '~/hooks/events/use-track-visit'
import { buildEventMeta } from '~/lib/seo/event-meta'
import type { Route } from './+types/$slug'

async function loadPage(slug: string, request: Request) {
    const { loadEventPage } = await import('~/services/event-catalog')
    const page = await loadEventPage(slug, new URL(request.url).searchParams.get(PREVIEW_PARAM))
    if (!page) throw data(null, { status: 404 })
    return page
}

export async function loader({ params, request }: Route.LoaderArgs) {
    return loadPage(params.slug, request)
}

export async function clientLoader({ params, request }: Route.ClientLoaderArgs) {
    return loadPage(params.slug, request)
}

export const meta: Route.MetaFunction = ({ loaderData }) => (loaderData ? buildEventMeta(loaderData) : [])

export function HydrateFallback() {
    return <EventPageSkeleton />
}

export default function Event({ loaderData }: Route.ComponentProps) {
    useTrackVisit(loaderData.event.id, !loaderData.preview)
    return <EventPage data={loaderData} />
}
