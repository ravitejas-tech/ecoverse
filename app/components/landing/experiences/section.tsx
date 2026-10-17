import { EmojiTile } from '~/components/ui/emoji-tile'
import { Reveal } from '~/components/ui/reveal'
import { Section } from '~/components/ui/section'
import { SectionHeading } from '~/components/ui/section-heading'
import { EXPERIENCES, EXPERIENCES_HEADING } from '~/data/landing/experiences'
import { SECTION_IDS } from '~/data/navigation'
import { eventsHref } from '~/lib/event-filters'

export function ExperiencesSection() {
    return (
        <Section
            id={SECTION_IDS.experiences}
            surface='muted'>
            <SectionHeading
                sectionId={SECTION_IDS.experiences}
                {...EXPERIENCES_HEADING}
                tone='cyan'
            />
            <div className='grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3'>
                {EXPERIENCES.map(({ category, ...experience }, index) => (
                    <Reveal
                        key={experience.title}
                        order={index}
                        className='h-full'>
                        <EmojiTile
                            {...experience}
                            tilt={index % 2 === 0 ? 'left' : 'right'}
                            to={eventsHref({ category })}
                        />
                    </Reveal>
                ))}
            </div>
        </Section>
    )
}
