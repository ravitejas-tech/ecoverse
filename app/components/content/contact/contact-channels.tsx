import { ContactCard } from '~/components/content/contact/contact-card'
import { Button } from '~/components/ui/button'
import { WhatsAppLink } from '~/components/ui/whatsapp-link'
import { CONTACT_LABELS, WHATSAPP_MESSAGES } from '~/data/contact'
import { CONTACT_CHANNELS, WHATSAPP_CHANNEL } from '~/data/content/contact'

export function ContactChannels() {
    return (
        <div className='grid gap-6 lg:grid-cols-3'>
            <ContactCard {...WHATSAPP_CHANNEL}>
                <Button
                    asChild
                    className='w-full'>
                    <WhatsAppLink message={WHATSAPP_MESSAGES.help}>{CONTACT_LABELS.whatsapp}</WhatsAppLink>
                </Button>
            </ContactCard>
            {CONTACT_CHANNELS.map(({ href, action, external, ...channel }) => (
                <ContactCard
                    key={channel.label}
                    {...channel}>
                    <Button
                        asChild
                        variant='secondary'
                        className='w-full'>
                        <a
                            href={href}
                            {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
                            {action}
                        </a>
                    </Button>
                </ContactCard>
            ))}
        </div>
    )
}
