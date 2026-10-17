import type { ReactNode } from 'react'
import { Chip } from '~/components/ui/chip'
import { PopCard } from '~/components/ui/pop-card'
import { Text } from '~/components/ui/text'
import type { ContactDetails } from '~/types/content'

export interface ContactCardProps extends ContactDetails {
    children: ReactNode
}

export function ContactCard({ label, value, body, icon: Icon, tone, children }: ContactCardProps) {
    return (
        <PopCard className='flex h-full flex-col gap-4 p-5 sm:p-6'>
            <div className='flex items-center gap-3'>
                <Chip
                    size='sm'
                    tone={tone}
                    aria-hidden>
                    <Icon />
                </Chip>
                <Text
                    as='h2'
                    variant='title'>
                    {label}
                </Text>
            </div>
            <Text variant='subtitle'>{value}</Text>
            <Text
                tone='secondary'
                className='flex-1'>
                {body}
            </Text>
            {children}
        </PopCard>
    )
}
