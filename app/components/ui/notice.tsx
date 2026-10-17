import type { ReactNode } from 'react'
import { cva } from 'class-variance-authority'
import type { LucideIcon } from 'lucide-react'
import { Text } from '~/components/ui/text'
import { POP_FILLS, type PopTone } from '~/data/ui/pop-tones'
import { cn } from '~/lib/utils'

const noticeVariants = cva('flex items-start gap-3 rounded-2xl border-2 border-border p-4 shadow-pop-sm', {
    variants: { tone: { surface: 'bg-surface', ...POP_FILLS } },
})

export interface NoticeProps {
    icon: LucideIcon
    title: string
    body?: string
    tone?: PopTone | 'surface'
    live?: 'polite' | 'assertive'
    action?: ReactNode
    className?: string
}

export function Notice({ icon: Icon, title, body, tone = 'surface', live, action, className }: NoticeProps) {
    const onPop = tone !== 'surface'

    return (
        <div
            role={live === 'assertive' ? 'alert' : live && 'status'}
            className={cn(noticeVariants({ tone }), className)}>
            <Icon
                className={cn('mt-0.5 size-5 shrink-0', onPop ? 'text-on-pop' : 'text-accent-text')}
                aria-hidden
            />
            <div className='min-w-0 flex-1 space-y-1'>
                <Text
                    variant='label'
                    tone={onPop ? 'on-pop' : 'primary'}>
                    {title}
                </Text>
                {body && (
                    <Text
                        variant='small'
                        tone={onPop ? 'on-pop' : 'secondary'}>
                        {body}
                    </Text>
                )}
                {action}
            </div>
        </div>
    )
}
