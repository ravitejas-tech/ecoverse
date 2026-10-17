import { Timer, TimerOff } from 'lucide-react'
import { IconText } from '~/components/ui/icon-text'
import { Notice } from '~/components/ui/notice'
import { HOLD_COPY } from '~/data/checkout/summary'
import { useCountdown } from '~/hooks/use-countdown'
import { formatCountdown } from '~/lib/time'

export interface HoldNoticeProps {
    holdExpiresAt: string
    compact?: boolean
}

export function HoldNotice({ holdExpiresAt, compact = false }: HoldNoticeProps) {
    const seconds = useCountdown(Date.parse(holdExpiresAt)) ?? 0
    const active = seconds > 0
    const title = active ? HOLD_COPY.holding(formatCountdown(seconds)) : HOLD_COPY.expired

    if (compact) {
        return (
            <IconText
                icon={active ? Timer : TimerOff}
                variant='label'
                className='mb-2'>
                {title}
            </IconText>
        )
    }

    return (
        <Notice
            tone={active ? 'yellow' : 'orange'}
            icon={active ? Timer : TimerOff}
            title={title}
            body={active ? HOLD_COPY.holdingHint : HOLD_COPY.expiredHint}
            live={active ? undefined : 'polite'}
        />
    )
}
