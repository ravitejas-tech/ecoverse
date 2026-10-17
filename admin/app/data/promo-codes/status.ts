import type { PopTone } from '~/data/ui/pop-tones'

export const PROMO_STATUSES = {
    active: { label: 'Active', tone: 'lime' },
    not_started: { label: 'Not started', tone: 'cyan' },
    used_up: { label: 'Used up', tone: 'orange' },
    expired: { label: 'Expired', tone: 'violet' },
    off: { label: 'Off', tone: 'muted' },
} as const satisfies Record<string, { label: string; tone: PopTone | 'muted' }>
