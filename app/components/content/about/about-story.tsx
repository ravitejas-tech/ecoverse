import { Polaroid } from '~/components/ui/polaroid'
import { Section } from '~/components/ui/section'
import { SectionHeading } from '~/components/ui/section-heading'
import { Text } from '~/components/ui/text'
import { ABOUT_HEADING, ABOUT_POLAROID, ABOUT_STORY } from '~/data/content/about'

export function AboutStory() {
    return (
        <Section surface='dots'>
            <div className='grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16'>
                <div>
                    <SectionHeading
                        level='h1'
                        {...ABOUT_HEADING}
                        tone='pink'
                        className='md:mb-8'
                    />
                    <div className='max-w-2xl space-y-4'>
                        {ABOUT_STORY.map((paragraph) => (
                            <Text
                                key={paragraph}
                                tone='secondary'>
                                {paragraph}
                            </Text>
                        ))}
                    </div>
                </div>
                <div className='mx-auto w-full max-w-sm'>
                    <Polaroid
                        shoutout={ABOUT_POLAROID}
                        tilt='right'
                    />
                </div>
            </div>
        </Section>
    )
}
