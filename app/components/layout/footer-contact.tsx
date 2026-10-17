import { Camera, Mail, MessageCircle } from 'lucide-react'
import { AnchorLink } from '~/components/ui/anchor-link'
import { Button } from '~/components/ui/button'
import { WhatsAppLink } from '~/components/ui/whatsapp-link'
import { CONTACT_LABELS, EMAIL, INSTAGRAM, WHATSAPP_MESSAGES } from '~/data/contact'

export function FooterContact() {
    return (
        <div className='flex flex-col items-start gap-2 pt-2'>
            <Button
                asChild
                size='sm'
                variant='secondary'
                className='mb-2'>
                <WhatsAppLink message={WHATSAPP_MESSAGES.help}>
                    <MessageCircle aria-hidden />
                    {CONTACT_LABELS.whatsapp}
                </WhatsAppLink>
            </Button>
            <AnchorLink
                to={INSTAGRAM.url}
                target='_blank'
                rel='noopener noreferrer'
                layout='list'
                icon={<Camera aria-hidden />}>
                {INSTAGRAM.handle}
            </AnchorLink>
            <AnchorLink
                to={EMAIL.href}
                layout='list'
                icon={<Mail aria-hidden />}>
                {EMAIL.address}
            </AnchorLink>
        </div>
    )
}
