import { useSyncExternalStore } from 'react'

const subscribe = (onTick: () => void) => {
    const timer = setInterval(onTick, 1000)
    return () => clearInterval(timer)
}

const currentSecond = () => Math.floor(Date.now() / 1000)

const serverSecond = () => 0

export function useCountdown(deadline: number | null) {
    const now = useSyncExternalStore(subscribe, currentSecond, serverSecond)
    return deadline === null ? null : Math.max(0, Math.ceil(deadline / 1000) - now)
}
