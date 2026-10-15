import { CONFETTI_RAIN } from '~/data/landing/confetti-rain'
import { CONFETTI_SHAPES } from '~/data/ui/confetti'
import { POP_FILLS } from '~/data/ui/pop-tones'
import { cn } from '~/lib/utils'

export function ConfettiRain() {
    return (
        <div
            className='pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden'
            aria-hidden>
            {CONFETTI_RAIN.map(({ left, delay, duration, tone, shape }) => (
                <span
                    key={`${left}-${delay}`}
                    className={cn(
                        'absolute -top-6 animate-confetti-fall border border-border',
                        POP_FILLS[tone],
                        CONFETTI_SHAPES[shape],
                    )}
                    style={{ left: `${left}%`, animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
                />
            ))}
        </div>
    )
}
