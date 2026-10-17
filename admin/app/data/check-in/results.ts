import { CircleCheckBig, CircleX, Repeat, TriangleAlert } from 'lucide-react'
import type { CheckInOutcome, CheckInResultStyle } from '~/types/check-in'

const LET_IN = [90]
const WARN = [120, 80, 120]
const STOP = [400, 120, 400]

export const CHECK_IN_RESULTS: Record<CheckInOutcome, CheckInResultStyle> = {
    valid: { tone: 'lime', icon: CircleCheckBig, title: 'Let them in', badge: 'In', vibrate: LET_IN },
    override: { tone: 'lime', icon: Repeat, title: 'Let them in again', badge: 'In again', vibrate: LET_IN },
    already_checked_in: {
        tone: 'yellow',
        icon: TriangleAlert,
        title: 'Already checked in',
        badge: 'Already in',
        vibrate: WARN,
    },
    invalid: { tone: 'pink', icon: CircleX, title: 'Not a valid ticket', badge: 'Not valid', vibrate: STOP },
    cancelled: { tone: 'pink', icon: CircleX, title: 'Ticket cancelled', badge: 'Cancelled', vibrate: STOP },
    wrong_event: { tone: 'pink', icon: CircleX, title: 'Wrong event', badge: 'Wrong event', vibrate: STOP },
}
