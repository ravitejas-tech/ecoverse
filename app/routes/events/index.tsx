import type { ShouldRevalidateFunctionArgs } from 'react-router'
import { EventDirectory } from '~/components/events/directory/event-directory'
import { Section } from '~/components/ui/section'
import { SectionHeading } from '~/components/ui/section-heading'
import { DIRECTORY_HEADING, EVENTS_PAGE } from '~/data/events/directory'
import { buildPageMeta } from '~/lib/seo/meta'
import type { Route } from './+types/index'

async function loadDirectory() {
    const { loadEventSummaries } = await import('~/services/event-catalog')
    return { events: await loadEventSummaries() }
}

export async function loader() {
    return loadDirectory()
}

export async function clientLoader() {
    return loadDirectory()
}

export function shouldRevalidate({ currentUrl, nextUrl, defaultShouldRevalidate }: ShouldRevalidateFunctionArgs) {
    return currentUrl.pathname === nextUrl.pathname ? false : defaultShouldRevalidate
}

export const meta: Route.MetaFunction = () => buildPageMeta(EVENTS_PAGE)

export default function Events({ loaderData: { events } }: Route.ComponentProps) {
    return (
        <Section surface='dots'>
            <SectionHeading
                level='h1'
                {...DIRECTORY_HEADING}
                tone='pink'
                className='md:mb-12'
            />
            <EventDirectory events={events} />
        </Section>
    )
}
