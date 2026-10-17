import { MessageCircle } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { WhatsAppLink } from '~/components/ui/whatsapp-link'
import { CONTACT_LABELS } from '~/data/contact'
import { cn } from '~/lib/utils'

export interface WhatsAppButtonProps {
    message: string
    label?: string
    className?: string
}

export function WhatsAppButton({ message, label = CONTACT_LABELS.ask, className }: WhatsAppButtonProps) {
    return (
        <Button
            asChild
            variant='secondary'
            className={cn('print:hidden', className)}>
            <WhatsAppLink message={message}>
                <MessageCircle aria-hidden />
                {label}
            </WhatsAppLink>
        </Button>
    )
}
