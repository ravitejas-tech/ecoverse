import { ContactChannels } from '~/components/content/contact/contact-channels'
import { EmojiTile } from '~/components/ui/emoji-tile'
import { Section } from '~/components/ui/section'
import { SectionHeading } from '~/components/ui/section-heading'
import { CONTACT_HEADING, CONTACT_PAGE, CONTACT_SHORTCUTS } from '~/data/content/contact'
import { buildPageMeta } from '~/lib/seo/meta'
import type { Route } from './+types/contact'

export const meta: Route.MetaFunction = () => buildPageMeta(CONTACT_PAGE)

export default function Contact() {
    return (
        <Section surface='dots'>
            <SectionHeading
                level='h1'
                {...CONTACT_HEADING}
                tone='lime'
                className='md:mb-12'
            />
            <ContactChannels />
            <div className='mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 md:mt-14'>
                {CONTACT_SHORTCUTS.map((shortcut, index) => (
                    <EmojiTile
                        key={shortcut.to}
                        {...shortcut}
                        tilt={index % 2 === 0 ? 'left' : 'right'}
                    />
                ))}
            </div>
        </Section>
    )
}
