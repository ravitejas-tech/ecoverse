import type { ReactNode } from 'react'
import { PopCard } from '~/components/ui/pop-card'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

export interface PanelProps {
    title: string
    action?: ReactNode
    className?: string
    children: ReactNode
}

export function Panel({ title, action, className, children }: PanelProps) {
    return (
        <PopCard
            asChild
            padding='md'
            className={cn('block space-y-4', className)}>
            <section>
                <div className='flex items-center justify-between gap-3'>
                    <Text
                        as='h2'
                        variant='title'>
                        {title}
                    </Text>
                    {action}
                </div>
                {children}
            </section>
        </PopCard>
    )
}
