import type { ReactNode } from 'react'
import { cn } from '~/lib/utils'

export interface DashedSectionProps {
    children: ReactNode
    className?: string
}

export function DashedSection({ children, className }: DashedSectionProps) {
    return <div className={cn('border-t-2 border-dashed border-border pt-5', className)}>{children}</div>
}
