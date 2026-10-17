import { JourneyStep } from '~/components/landing/journey/journey-step'
import { SectionHeading } from '~/components/ui/section-heading'
import { Reveal } from '~/components/ui/reveal'
import { Section } from '~/components/ui/section'
import { JOURNEY_HEADING, JOURNEY_STEPS } from '~/data/landing/journey'
import { SECTION_IDS } from '~/data/navigation'

export function JourneySection() {
    return (
        <Section
            id={SECTION_IDS.journey}
            surface='dots'>
            <SectionHeading
                sectionId={SECTION_IDS.journey}
                {...JOURNEY_HEADING}
                tone='lime'
                centered
            />
            <div className='grid sm:grid-cols-2 sm:gap-10 lg:grid-cols-5 lg:gap-6'>
                {JOURNEY_STEPS.map((step, index) => (
                    <Reveal
                        key={step.title}
                        order={index}
                        className='h-full'>
                        <JourneyStep
                            step={step}
                            number={String(index + 1).padStart(2, '0')}
                            last={index === JOURNEY_STEPS.length - 1}
                        />
                    </Reveal>
                ))}
            </div>
        </Section>
    )
}
