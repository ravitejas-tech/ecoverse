import { ExperienceTile } from '~/components/landing/experiences/experience-tile'
import { SectionHeading } from '~/components/landing/section-heading'
import { Reveal } from '~/components/ui/reveal'
import { Section } from '~/components/ui/section'
import { EXPERIENCES, EXPERIENCES_HEADING } from '~/data/landing/experiences'
import { SECTION_IDS } from '~/data/navigation'

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
                {EXPERIENCES.map((experience, index) => (
                    <Reveal
                        key={experience.title}
                        order={index}
                        className='h-full'>
                        <ExperienceTile
                            experience={experience}
                            tilt={index % 2 === 0 ? 'left' : 'right'}
                        />
                    </Reveal>
                ))}
            </div>
        </Section>
    )
}
