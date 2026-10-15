import { ArrowRight } from 'lucide-react'
import { CelebrateButton } from '~/components/landing/celebrate-button'
import { Button } from '~/components/ui/button'
import { PopCard } from '~/components/ui/pop-card'
import { Reveal } from '~/components/ui/reveal'
import { Section } from '~/components/ui/section'
import { Sticker } from '~/components/ui/sticker'
import { Text } from '~/components/ui/text'
import { CTA_CONFETTI_LABEL, CTA_LEAD, CTA_STICKER, CTA_TITLE } from '~/data/landing/cta'
import { sectionTitleId } from '~/data/layout/landmarks'
import { PRIMARY_CTA, SECTION_IDS } from '~/data/navigation'

export function CallToActionSection() {
    return (
        <Section
            id={SECTION_IDS.join}
            surface='dots'>
            <Reveal>
                <PopCard
                    tone='pink'
                    className='relative overflow-hidden px-5 py-12 text-center shadow-pop-lg sm:px-12 md:py-24'>
                    <div className='relative mx-auto max-w-3xl space-y-6 sm:space-y-8'>
                        <Sticker
                            tone='yellow'
                            tilt='hard-left'>
                            {CTA_STICKER}
                        </Sticker>
                        <Text
                            as='h2'
                            id={sectionTitleId(SECTION_IDS.join)}
                            variant='display'
                            tone='on-pop'>
                            {CTA_TITLE}
                        </Text>
                        <Text
                            variant='lead'
                            tone='on-pop'>
                            {CTA_LEAD}
                        </Text>
                        <div className='grid gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-4'>
                            <Button
                                asChild
                                size='lg'
                                variant='sunny'>
                                <a href={PRIMARY_CTA.href}>
                                    {PRIMARY_CTA.label}
                                    <ArrowRight />
                                </a>
                            </Button>
                            <CelebrateButton
                                size='lg'
                                variant='secondary'>
                                {CTA_CONFETTI_LABEL}
                            </CelebrateButton>
                        </div>
                    </div>
                </PopCard>
            </Reveal>
        </Section>
    )
}
