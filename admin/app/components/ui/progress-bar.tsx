import { cva } from 'class-variance-authority'
import { POP_FILLS, type PopTone } from '~/data/ui/pop-tones'
import { cn } from '~/lib/utils'

const trackVariants = cva('overflow-hidden rounded-full border-2 border-border bg-surface-muted', {
    variants: { size: { sm: 'h-3', md: 'h-5' } },
    defaultVariants: { size: 'md' },
})

export interface ProgressBarProps {
    value: number
    max: number
    label: string
    tone?: PopTone
    size?: 'sm' | 'md'
    className?: string
}

export function ProgressBar({ value, max, label, tone = 'lime', size, className }: ProgressBarProps) {
    const percent = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
    return (
        <div
            role='progressbar'
            aria-label={label}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-valuenow={value}
            className={cn(trackVariants({ size }), className)}>
            <div
                className={cn(
                    'h-full border-r-2 border-border transition-all',
                    POP_FILLS[tone],
                    percent === 0 && 'hidden',
                )}
                style={{ width: `${percent}%` }}
            />
        </div>
    )
}
