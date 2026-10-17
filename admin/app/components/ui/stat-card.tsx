import type { LucideIcon } from 'lucide-react'
import { Chip } from '~/components/ui/chip'
import { PopCard } from '~/components/ui/pop-card'
import { Text } from '~/components/ui/text'
import type { PopTone } from '~/data/ui/pop-tones'

export interface StatCardProps {
    label: string
    value: string
    hint?: string
    icon: LucideIcon
    tone?: PopTone
}

export function StatCard({ label, value, hint, icon: Icon, tone = 'yellow' }: StatCardProps) {
    return (
        <PopCard
            padding='md'
            className='flex items-start justify-between gap-3'>
            <div className='min-w-0 space-y-2'>
                <Text variant='meta'>{label}</Text>
                <Text variant='stat'>{value}</Text>
                {hint && (
                    <Text
                        variant='small'
                        tone='muted'>
                        {hint}
                    </Text>
                )}
            </div>
            <Chip
                size='sm'
                tone={tone}
                className='hidden sm:grid'
                aria-hidden>
                <Icon className='size-5 text-on-pop' />
            </Chip>
        </PopCard>
    )
}
