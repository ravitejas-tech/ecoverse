import { LoaderCircle } from 'lucide-react'
import { cn } from '~/lib/utils'

export function Spinner({ className }: { className?: string }) {
    return (
        <LoaderCircle
            className={cn('size-5 shrink-0 motion-safe:animate-spin', className)}
            aria-hidden
        />
    )
}
