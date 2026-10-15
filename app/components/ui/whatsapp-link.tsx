import type { AnchorHTMLAttributes } from 'react'
import { Text } from '~/components/ui/text'
import { WHATSAPP } from '~/data/contact'
import { whatsappUrl } from '~/lib/whatsapp'

export interface WhatsAppLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel'> {
    message: string
}

export function WhatsAppLink({ message, children, ...props }: WhatsAppLinkProps) {
    return (
        <a
            href={whatsappUrl(message)}
            target='_blank'
            rel='noopener noreferrer'
            {...props}>
            {children}
            <Text
                as='span'
                variant='inherit'
                className='sr-only'>
                {WHATSAPP.hint}
            </Text>
        </a>
    )
}
