import { ArrowRight } from 'lucide-react'
import { OverrideButton } from '~/components/check-in/scanner/override-button'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { CHECK_IN_COPY } from '~/data/check-in/copy'
import { CHECK_IN_RESULTS } from '~/data/check-in/results'
import { POP_FILLS } from '~/data/ui/pop-tones'
import { resultDetails } from '~/lib/check-in'
import { cn } from '~/lib/utils'
import type { CheckInResponse } from '~/types/check-in'

const { result: copy } = CHECK_IN_COPY

export interface ResultOverlayProps {
    response: CheckInResponse
    onNext: () => void
    onOverride?: () => void
    pending: boolean
}

export function ResultOverlay({ response, onNext, onOverride, pending }: ResultOverlayProps) {
    const { tone, icon: Icon, title } = CHECK_IN_RESULTS[response.result]
    const { name, lines } = resultDetails(response)

    return (
        <div
            role='alert'
            onClick={onNext}
            className={cn(
                'fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center gap-5 overflow-y-auto px-6 py-10 text-center motion-safe:animate-pop-in',
                POP_FILLS[tone],
            )}>
            <Icon
                className='size-24 shrink-0 text-on-pop sm:size-32'
                strokeWidth={2.5}
                aria-hidden
            />
            <Text
                variant='result'
                tone='on-pop'>
                {title}
            </Text>
            {name && (
                <Text
                    variant='display'
                    tone='on-pop'>
                    {name}
                </Text>
            )}
            {lines.map((line) => (
                <Text
                    key={line}
                    variant='lead'
                    tone='on-pop'>
                    {line}
                </Text>
            ))}
            {response.ticket_code && (
                <Text
                    variant='code'
                    tone='on-pop'>
                    {response.ticket_code}
                </Text>
            )}
            <div className='mt-4 grid w-full max-w-sm gap-3'>
                {onOverride && (
                    <OverrideButton
                        onConfirm={onOverride}
                        pending={pending}
                    />
                )}
                <Button
                    size='lg'
                    variant='secondary'
                    autoFocus
                    onClick={onNext}>
                    {copy.next}
                    <ArrowRight />
                </Button>
            </div>
            <Text
                variant='small'
                tone='on-pop'>
                {copy.tapHint}
            </Text>
        </div>
    )
}
