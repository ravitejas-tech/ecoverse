import { cn } from '~/lib/utils'

export function Skeleton({ className }: { className?: string }) {
    return (
        <div
            className={cn('rounded-2xl bg-surface-muted motion-safe:animate-pulse', className)}
            aria-hidden
        />
    )
}
