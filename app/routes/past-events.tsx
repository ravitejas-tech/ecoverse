import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { PastEventRecap } from '~/components/content/past-events/past-event-recap'
import { Button } from '~/components/ui/button'
import { ButtonRow } from '~/components/ui/button-row'
import { EmptyState } from '~/components/ui/empty-state'
import { Section } from '~/components/ui/section'
import { SectionHeading } from '~/components/ui/section-heading'
import { PAST_EVENTS_COPY, PAST_EVENTS_EMPTY, PAST_EVENTS_HEADING, PAST_EVENTS_PAGE } from '~/data/content/past-events'
import { PATHS } from '~/data/navigation'
import { buildPageMeta } from '~/lib/seo/meta'
import type { Route } from './+types/past-events'

async function loadRecaps() {
    const { loadPastEvents } = await import('~/services/event-catalog')
    return { recaps: await loadPastEvents() }
}

export async function loader() {
    return loadRecaps()
}

export async function clientLoader() {
    return loadRecaps()
}

export const meta: Route.MetaFunction = () => buildPageMeta(PAST_EVENTS_PAGE)

export default function PastEvents({ loaderData: { recaps } }: Route.ComponentProps) {
    const upcoming = (
        <Button asChild>
            <Link to={PATHS.events}>
                {PAST_EVENTS_COPY.upcoming}
                <ArrowRight aria-hidden />
            </Link>
        </Button>
    )

    return (
        <Section surface='dots'>
            <SectionHeading
                level='h1'
                {...PAST_EVENTS_HEADING}
                tone='violet'
                className='md:mb-12'
            />
            {recaps.length > 0 ? (
                <div className='space-y-12 sm:space-y-10'>
                    {recaps.map((recap, index) => (
                        <PastEventRecap
                            key={recap.event.slug}
                            recap={recap}
                            priority={index === 0}
                        />
                    ))}
                    <ButtonRow align='center'>{upcoming}</ButtonRow>
                </div>
            ) : (
                <EmptyState
                    {...PAST_EVENTS_EMPTY}
                    action={upcoming}
                />
            )}
        </Section>
    )
}
