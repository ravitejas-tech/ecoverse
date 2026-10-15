import { CallToActionSection } from '~/components/landing/cta/section'
import { EventsSection } from '~/components/landing/events/section'
import { ExperiencesSection } from '~/components/landing/experiences/section'
import { HeroSection } from '~/components/landing/hero/section'
import { JourneySection } from '~/components/landing/journey/section'
import { MarqueeBand } from '~/components/landing/marquee/band'
import { ShoutoutsSection } from '~/components/landing/shoutouts/section'
import { VibeCheckSection } from '~/components/landing/vibe-check/section'
import { UPCOMING_EVENTS } from '~/data/landing/events'
import { LANDING_PAGE } from '~/data/landing/meta'
import { buildHomeSchema } from '~/lib/seo/home-schema'
import { buildPageMeta } from '~/lib/seo/meta'
import type { Route } from './+types/index'

export const meta: Route.MetaFunction = () => [
    ...buildPageMeta(LANDING_PAGE),
    { 'script:ld+json': buildHomeSchema(LANDING_PAGE, UPCOMING_EVENTS) },
]

export default function Home() {
    return (
        <>
            <HeroSection />
            <MarqueeBand />
            <EventsSection />
            <ExperiencesSection />
            <JourneySection />
            <VibeCheckSection />
            <ShoutoutsSection />
            <CallToActionSection />
        </>
    )
}
