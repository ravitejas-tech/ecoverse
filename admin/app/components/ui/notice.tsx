import type { ReactNode } from 'react'
import { PopCard } from '~/components/ui/pop-card'
import { Text } from '~/components/ui/text'
import type { PopTone } from '~/data/ui/pop-tones'

export interface NoticeProps {
    children: string
    title?: string
    tone?: PopTone
    action?: ReactNode
    className?: string
}

export function Notice({ children, title, tone = 'yellow', action, className }: NoticeProps) {
    return (
        <PopCard
            tone={tone}
            role='alert'
            className={className}>
            <div className='flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between'>
                <div className='space-y-1'>
                    {title && (
                        <Text
                            variant='title'
                            tone='on-pop'>
                            {title}
                        </Text>
                    )}
                    <Text
                        variant='small'
                        tone='on-pop'>
                        {children}
                    </Text>
                </div>
                {action}
            </div>
        </PopCard>
    )
}
