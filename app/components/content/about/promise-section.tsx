import { EmojiTile } from '~/components/ui/emoji-tile'
import { Reveal } from '~/components/ui/reveal'
import { Section } from '~/components/ui/section'
import { SectionHeading } from '~/components/ui/section-heading'
import { PROMISE_HEADING, PROMISES } from '~/data/content/about'

export function PromiseSection() {
    return (
        <Section
            id={PROMISE_HEADING.id}
            surface='muted'>
            <SectionHeading
                sectionId={PROMISE_HEADING.id}
                eyebrow={PROMISE_HEADING.eyebrow}
                title={PROMISE_HEADING.title}
                scrawl={PROMISE_HEADING.scrawl}
                tone='yellow'
            />
            <div className='grid gap-4 sm:grid-cols-3 sm:gap-6'>
                {PROMISES.map((promise, index) => (
                    <Reveal
                        key={promise.title}
                        order={index}
                        className='h-full'>
                        <EmojiTile
                            {...promise}
                            tilt={index % 2 === 0 ? 'left' : 'right'}
                        />
                    </Reveal>
                ))}
            </div>
        </Section>
    )
}
