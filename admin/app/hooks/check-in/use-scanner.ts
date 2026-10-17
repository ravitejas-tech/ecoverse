import { useEffect, useRef } from 'react'
import { AUTO_NEXT_MS, DUPLICATE_WINDOW_MS } from '~/data/check-in/scanner'
import { useCheckIn } from '~/hooks/check-in/mutations'
import { useCan } from '~/hooks/staff/use-can'
import type { CheckOptions } from '~/types/check-in'

export function useScanner(eventId: string) {
    const canOverride = useCan('overrideCheckIn')
    const { mutate, data: result, variables, isPending, reset } = useCheckIn()
    const lastScan = useRef<{ value: string; at: number } | null>(null)
    const waitingForOverride = canOverride && result?.result === 'already_checked_in'

    useEffect(() => {
        if (!result || waitingForOverride) return
        const timer = setTimeout(reset, AUTO_NEXT_MS)
        return () => clearTimeout(timer)
    }, [result, waitingForOverride, reset])

    const check = (value: string, { override = false, onSuccess }: CheckOptions = {}) =>
        mutate({ eventId, value, override }, { onSuccess })

    const onDecode = (value: string) => {
        const now = Date.now()
        const last = lastScan.current
        lastScan.current = { value, at: now }
        if (isPending || result) return
        if (last?.value === value && now - last.at < DUPLICATE_WINDOW_MS) return
        check(value)
    }

    return {
        result,
        isPending,
        check,
        onDecode,
        next: reset,
        override: waitingForOverride && variables ? () => check(variables.value, { override: true }) : undefined,
    }
}
