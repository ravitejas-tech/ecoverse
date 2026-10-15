import { cn } from '~/lib/utils'

const NOTCH_SIDES = ['-left-3.5', '-right-3.5'] as const

export function Perforation() {
    return (
        <div
            className='relative h-0 border-t-2 border-dashed border-border'
            aria-hidden>
            {NOTCH_SIDES.map((side) => (
                <span
                    key={side}
                    className={cn('absolute -top-3.5 size-7 rounded-full border-2 border-border bg-bg', side)}
                />
            ))}
        </div>
    )
}
