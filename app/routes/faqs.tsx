import { MessageCircle } from 'lucide-react'
import { Link } from 'react-router'
import { FaqGroup } from '~/components/content/faqs/faq-group'
import { FaqJump } from '~/components/content/faqs/faq-jump'
import { Button } from '~/components/ui/button'
import { ButtonRow } from '~/components/ui/button-row'
import { EmptyState } from '~/components/ui/empty-state'
import { Section } from '~/components/ui/section'
import { SectionHeading } from '~/components/ui/section-heading'
import { WhatsAppLink } from '~/components/ui/whatsapp-link'
import { CONTACT_LABELS, WHATSAPP_MESSAGES } from '~/data/contact'
import { FAQ_GROUPS, FAQS_HEADING, FAQS_HELP, FAQS_PAGE } from '~/data/content/faqs'
import { PATHS } from '~/data/navigation'
import { buildFaqSchema } from '~/lib/seo/faq-schema'
import { buildPageMeta } from '~/lib/seo/meta'
import type { Route } from './+types/faqs'

export const meta: Route.MetaFunction = () => [
    ...buildPageMeta(FAQS_PAGE),
    {
        'script:ld+json': buildFaqSchema(
            FAQS_PAGE,
            FAQ_GROUPS.flatMap(({ items }) => items),
        ),
    },
]

export default function Faqs() {
    return (
        <Section>
            <div className='mx-auto max-w-3xl'>
                <SectionHeading
                    level='h1'
                    {...FAQS_HEADING}
                    tone='cyan'
                    className='md:mb-10'
                />
                <FaqJump groups={FAQ_GROUPS} />
                <div className='space-y-14'>
                    {FAQ_GROUPS.map((group) => (
                        <FaqGroup
                            key={group.id}
                            group={group}
                        />
                    ))}
                </div>
                <div className='mt-16'>
                    <EmptyState
                        emoji={FAQS_HELP.emoji}
                        title={FAQS_HELP.title}
                        body={FAQS_HELP.body}
                        tone='lime'
                        action={
                            <ButtonRow align='center'>
                                <Button asChild>
                                    <WhatsAppLink message={WHATSAPP_MESSAGES.help}>
                                        <MessageCircle aria-hidden />
                                        {CONTACT_LABELS.whatsapp}
                                    </WhatsAppLink>
                                </Button>
                                <Button
                                    asChild
                                    variant='secondary'>
                                    <Link to={PATHS.contact}>{FAQS_HELP.contact}</Link>
                                </Button>
                            </ButtonRow>
                        }
                    />
                </div>
            </div>
        </Section>
    )
}
