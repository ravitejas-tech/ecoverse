import { CallToActionSection } from '~/components/landing/cta/section'
import { EventsSection } from '~/components/landing/events/section'
import { ExperiencesSection } from '~/components/landing/experiences/section'
import { HeroSection } from '~/components/landing/hero/section'
import { JourneySection } from '~/components/landing/journey/section'
import { MarqueeBand } from '~/components/landing/marquee/band'
import { ShoutoutsSection } from '~/components/landing/shoutouts/section'
import { VibeCheckSection } from '~/components/landing/vibe-check/section'
import { HOME_EVENTS_LIMIT } from '~/data/landing/events'
import { LANDING_PAGE } from '~/data/landing/meta'
import { buildHomeSchema } from '~/lib/seo/home-schema'
import { buildPageMeta } from '~/lib/seo/meta'
import type { Route } from './+types/index'

async function loadHome() {
    const { loadUpcomingEvents } = await import('~/services/event-catalog')
    return { events: await loadUpcomingEvents() }
}

export async function loader() {
    return loadHome()
}

export async function clientLoader() {
    return loadHome()
}

export const meta: Route.MetaFunction = ({ loaderData }) => [
    ...buildPageMeta(LANDING_PAGE),
    { 'script:ld+json': buildHomeSchema(LANDING_PAGE, loaderData?.events ?? []) },
]

export default function Home({ loaderData: { events } }: Route.ComponentProps) {
    return (
        <>
            <HeroSection featured={events[0]} />
            <MarqueeBand />
            <EventsSection events={events.slice(0, HOME_EVENTS_LIMIT)} />
            <ExperiencesSection />
            <JourneySection />
            <VibeCheckSection />
            <ShoutoutsSection />
            <CallToActionSection />
        </>
    )
}
