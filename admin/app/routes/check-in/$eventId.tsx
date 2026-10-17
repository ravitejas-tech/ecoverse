import { ScannerCamera } from '~/components/check-in/scanner/camera'
import { ScannerHeader } from '~/components/check-in/scanner/header'
import { ManualEntry } from '~/components/check-in/scanner/manual-entry'
import { RecentScans } from '~/components/check-in/scanner/recent-scans'
import { ResultOverlay } from '~/components/check-in/scanner/result-overlay'
import { EmptyState } from '~/components/ui/empty-state'
import { Spinner } from '~/components/ui/spinner'
import { CHECK_IN_COPY } from '~/data/check-in/copy'
import { LOADING_LABEL } from '~/data/ui/feedback'
import { useCheckInEvent, useCheckInStats, useRecentCheckIns } from '~/hooks/check-in/queries'
import { useScanner } from '~/hooks/check-in/use-scanner'
import { useWakeLock } from '~/hooks/use-wake-lock'
import { requirePermission } from '~/lib/guards'
import type { Route } from './+types/$eventId'

export async function clientLoader() {
    await requirePermission('checkIn')
    return null
}

export default function Scanner({ params: { eventId } }: Route.ComponentProps) {
    useWakeLock()
    const event = useCheckInEvent({ variables: eventId })
    const { data: stats } = useCheckInStats({ variables: eventId })
    const { data: scans = [] } = useRecentCheckIns({ variables: eventId })
    const { result, isPending, check, onDecode, next, override } = useScanner(eventId)

    if (event.isPending) return <Spinner label={LOADING_LABEL} />
    if (!event.data) return <EmptyState {...CHECK_IN_COPY.scanner.notFound} />

    return (
        <div className='space-y-6'>
            <ScannerHeader
                event={event.data}
                checkedIn={stats?.checked_in ?? 0}
                tickets={stats?.valid_tickets ?? 0}
            />
            <div className='grid gap-6 lg:grid-cols-5 lg:items-start'>
                <div className='min-w-0 lg:col-span-3'>
                    <ScannerCamera
                        onDecode={onDecode}
                        checking={isPending}
                    />
                </div>
                <div className='min-w-0 space-y-6 lg:col-span-2'>
                    <ManualEntry
                        onCheck={check}
                        pending={isPending}
                    />
                    <RecentScans scans={scans} />
                </div>
            </div>
            {result && (
                <ResultOverlay
                    response={result}
                    onNext={next}
                    onOverride={override}
                    pending={isPending}
                />
            )}
        </div>
    )
}
