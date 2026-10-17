import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Text, type TextVariant } from '~/components/ui/text'
import { cn } from '~/lib/utils'

export interface IconTextProps {
    icon: LucideIcon
    children: ReactNode
    variant?: Extract<TextVariant, 'small' | 'label'>
    className?: string
}

export function IconText({ icon: Icon, children, variant = 'small', className }: IconTextProps) {
    return (
        <Text
            variant={variant}
            tone='secondary'
            className={cn('flex items-start gap-2', className)}>
            <Icon
                className='mt-1 size-4 shrink-0'
                aria-hidden
            />
            <span className='min-w-0'>{children}</span>
        </Text>
    )
}
