import { Check, CircleSmall, Info, Sparkles, X, type LucideIcon } from 'lucide-react'
import type { PopTone } from '~/data/ui/pop-tones'

export const BULLETS = {
    check: { icon: Check, tone: 'lime' },
    cross: { icon: X, tone: 'orange' },
    info: { icon: Info, tone: 'cyan' },
    sparkle: { icon: Sparkles, tone: 'yellow' },
    dot: { icon: CircleSmall, tone: 'violet' },
} as const satisfies Record<string, { icon: LucideIcon; tone: PopTone }>

export type Bullet = keyof typeof BULLETS
