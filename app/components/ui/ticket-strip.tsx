import type { ReactNode } from 'react'
import { POP_FILLS, type PopTone } from '~/data/ui/pop-tones'
import { cn } from '~/lib/utils'

export interface TicketStripProps {
    tone: PopTone
    children: ReactNode
}

export function TicketStrip({ tone, children }: TicketStripProps) {
    return (
        <div
            className={cn(
                'flex items-center justify-between gap-3 border-b-2 border-border px-5 py-3 sm:px-6',
                POP_FILLS[tone],
            )}>
            {children}
        </div>
    )
}
