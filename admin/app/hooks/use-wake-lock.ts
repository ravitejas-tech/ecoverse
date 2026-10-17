import { useEffect } from 'react'

export function useWakeLock() {
    useEffect(() => {
        if (!('wakeLock' in navigator)) return
        let lock: WakeLockSentinel | undefined
        let active = true

        const request = () => {
            if (document.visibilityState !== 'visible') return
            navigator.wakeLock
                .request('screen')
                .then((sentinel) => {
                    if (active) lock = sentinel
                    else void sentinel.release()
                })
                .catch(() => undefined)
        }

        request()
        document.addEventListener('visibilitychange', request)
        return () => {
            active = false
            document.removeEventListener('visibilitychange', request)
            void lock?.release()
        }
    }, [])
}
