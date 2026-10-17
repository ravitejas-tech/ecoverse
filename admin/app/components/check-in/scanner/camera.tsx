import { CameraOff, RotateCcw } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { PopCard } from '~/components/ui/pop-card'
import { Sticker } from '~/components/ui/sticker'
import { Text } from '~/components/ui/text'
import { CHECK_IN_COPY } from '~/data/check-in/copy'
import { useQrScanner } from '~/hooks/check-in/use-qr-scanner'

const { scanner } = CHECK_IN_COPY

export function ScannerCamera({ onDecode, checking }: { onDecode: (value: string) => void; checking: boolean }) {
    const { videoRef, regionRef, camera, retry } = useQrScanner(onDecode)
    const failed = camera === 'blocked' || camera === 'unavailable'

    return (
        <div className='relative aspect-square w-full min-w-0 overflow-hidden rounded-3xl border-2 border-border bg-on-pop shadow-pop sm:aspect-4/3'>
            <video
                ref={videoRef}
                muted
                playsInline
                className='absolute inset-0 size-full object-cover'
            />
            <div
                ref={regionRef}
                className='absolute rounded-2xl border-4 border-pop-yellow'
                aria-hidden
            />
            {camera === 'scanning' && (
                <div className='absolute inset-x-0 bottom-4 flex justify-center px-4'>
                    <Sticker tone={checking ? 'cyan' : 'yellow'}>{checking ? scanner.checking : scanner.aim}</Sticker>
                </div>
            )}
            {camera === 'starting' && (
                <div className='absolute inset-0 grid place-items-center'>
                    <Sticker tone='yellow'>{scanner.starting}</Sticker>
                </div>
            )}
            {failed && (
                <div className='absolute inset-0 grid place-items-center p-4'>
                    <PopCard
                        padding='md'
                        className='max-w-sm space-y-3 text-center'>
                        <CameraOff
                            className='mx-auto size-10'
                            aria-hidden
                        />
                        <Text variant='title'>
                            {camera === 'blocked' ? scanner.blockedTitle : scanner.unavailableTitle}
                        </Text>
                        <Text
                            variant='small'
                            tone='secondary'>
                            {camera === 'blocked' ? scanner.blockedBody : scanner.unavailableBody}
                        </Text>
                        <Button
                            variant='secondary'
                            size='sm'
                            onClick={retry}>
                            <RotateCcw />
                            {scanner.retry}
                        </Button>
                    </PopCard>
                </div>
            )}
        </div>
    )
}
