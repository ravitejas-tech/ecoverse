import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Chip } from '~/components/ui/chip'
import { Text } from '~/components/ui/text'
import type { PopTone } from '~/data/ui/pop-tones'

export interface FactRowProps {
    icon: LucideIcon
    label: string
    value: string
    tone: PopTone
    children?: ReactNode
}

export function FactRow({ icon: Icon, label, value, tone, children }: FactRowProps) {
    return (
        <div className='flex items-start gap-3'>
            <Chip
                size='sm'
                tone={tone}
                aria-hidden>
                <Icon />
            </Chip>
            <div className='min-w-0 space-y-0.5'>
                <Text variant='meta'>{label}</Text>
                <Text variant='subtitle'>{value}</Text>
                {children}
            </div>
        </div>
    )
}
