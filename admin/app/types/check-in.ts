import type { LucideIcon } from 'lucide-react'
import type { PopTone } from '~/data/ui/pop-tones'
import type { checkInResponseSchema } from '~/schemas/check-in'
import type { listCheckInEvents, listRecentCheckIns } from '~/services/check-in'
import type { Enums } from '~/types/database'
import type { z } from 'zod'

export type CheckInOutcome = Enums<'check_in_result'>

export type CheckInResponse = z.infer<typeof checkInResponseSchema>

export interface CheckInRequest {
    eventId: string
    value: string
    override?: boolean
}

export type CheckInEvent = Awaited<ReturnType<typeof listCheckInEvents>>[number]

export type RecentCheckIn = Awaited<ReturnType<typeof listRecentCheckIns>>[number]

export type CameraState = 'starting' | 'scanning' | 'blocked' | 'unavailable'

export interface CheckInResultStyle {
    tone: PopTone
    icon: LucideIcon
    title: string
    badge: string
    vibrate: number[]
}

export interface CheckOptions {
    override?: boolean
    onSuccess?: () => void
}
