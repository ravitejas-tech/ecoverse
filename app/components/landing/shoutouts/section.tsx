import { SectionHeading } from '~/components/landing/section-heading'
import { Polaroid } from '~/components/landing/shoutouts/polaroid'
import { Reveal } from '~/components/ui/reveal'
import { Section } from '~/components/ui/section'
import { SwipeGrid } from '~/components/ui/swipe-grid'
import { SHOUTOUTS, SHOUTOUTS_HEADING } from '~/data/landing/shoutouts'
import { SECTION_IDS } from '~/data/navigation'
import type { Tilt } from '~/data/ui/tilts'

const POLAROID_TILTS: Tilt[] = ['left', 'hard-right', 'right', 'hard-left']

export function ShoutoutsSection() {
    return (
        <Section id={SECTION_IDS.shoutouts}>
            <SectionHeading
                sectionId={SECTION_IDS.shoutouts}
                {...SHOUTOUTS_HEADING}
                tone='violet'
            />
            <SwipeGrid columns='four'>
                {SHOUTOUTS.map((shoutout, index) => (
                    <Reveal
                        key={shoutout.handle}
                        order={index}
                        className='h-full'>
                        <Polaroid
                            shoutout={shoutout}
                            tilt={POLAROID_TILTS[index % POLAROID_TILTS.length] ?? 'none'}
                        />
                    </Reveal>
                ))}
            </SwipeGrid>
        </Section>
    )
}
