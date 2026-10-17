import { AboutStory } from '~/components/content/about/about-story'
import { PromiseSection } from '~/components/content/about/promise-section'
import { CallToActionSection } from '~/components/landing/cta/section'
import { ExperiencesSection } from '~/components/landing/experiences/section'
import { JourneySection } from '~/components/landing/journey/section'
import { ABOUT_PAGE } from '~/data/content/about'
import { buildPageMeta } from '~/lib/seo/meta'
import type { Route } from './+types/about'

export const meta: Route.MetaFunction = () => buildPageMeta(ABOUT_PAGE)

export default function About() {
    return (
        <>
            <AboutStory />
            <ExperiencesSection />
            <JourneySection />
            <PromiseSection />
            <CallToActionSection />
        </>
    )
}
