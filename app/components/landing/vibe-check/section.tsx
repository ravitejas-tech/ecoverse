import { SectionHeading } from '~/components/landing/section-heading'
import { DrakeMeme } from '~/components/landing/vibe-check/drake-meme'
import { Reveal } from '~/components/ui/reveal'
import { Section } from '~/components/ui/section'
import { SwipeGrid } from '~/components/ui/swipe-grid'
import { DRAKE_MEMES, VIBE_CHECK_HEADING } from '~/data/landing/vibe-check'
import { SECTION_IDS } from '~/data/navigation'

export function VibeCheckSection() {
    return (
        <Section
            id={SECTION_IDS.vibeCheck}
            surface='muted'>
            <SectionHeading
                sectionId={SECTION_IDS.vibeCheck}
                {...VIBE_CHECK_HEADING}
                tone='orange'
            />
            <SwipeGrid columns='stacked-then-three'>
                {DRAKE_MEMES.map((meme, index) => (
                    <Reveal
                        key={meme.yep}
                        order={index}
                        className='h-full'>
                        <DrakeMeme
                            meme={meme}
                            tilt={index === 1 ? 'right' : 'left'}
                        />
                    </Reveal>
                ))}
            </SwipeGrid>
        </Section>
    )
}
