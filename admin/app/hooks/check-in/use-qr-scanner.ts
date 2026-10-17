import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { MAX_SCANS_PER_SECOND } from '~/data/check-in/scanner'
import { isCameraBlocked } from '~/lib/check-in'
import type { CameraState } from '~/types/check-in'

export function useQrScanner(onDecode: (value: string) => void) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const regionRef = useRef<HTMLDivElement>(null)
    const [camera, setCamera] = useState<CameraState>('starting')
    const [attempt, setAttempt] = useState(0)
    const handleDecode = useEffectEvent((value: string) => onDecode(value))

    useEffect(() => {
        const video = videoRef.current
        if (!video) return
        let active = true
        let scanner: { destroy: () => void } | undefined

        const start = async () => {
            const { default: QrScanner } = await import('qr-scanner')
            if (!active) return
            if (!(await QrScanner.hasCamera())) throw new Error('no-camera')
            if (!active) return
            const instance = new QrScanner(video, ({ data }) => handleDecode(data), {
                preferredCamera: 'environment',
                highlightScanRegion: true,
                overlay: regionRef.current ?? undefined,
                maxScansPerSecond: MAX_SCANS_PER_SECOND,
                returnDetailedScanResult: true,
            })
            scanner = instance
            await instance.start()
            if (active) setCamera('scanning')
        }

        start().catch((error: unknown) => {
            if (active) setCamera(isCameraBlocked(error) ? 'blocked' : 'unavailable')
        })
        return () => {
            active = false
            scanner?.destroy()
        }
    }, [attempt])

    const retry = () => {
        setCamera('starting')
        setAttempt((count) => count + 1)
    }

    return { videoRef, regionRef, camera, retry }
}
