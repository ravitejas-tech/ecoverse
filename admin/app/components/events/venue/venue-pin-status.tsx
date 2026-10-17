import { MapPin, X } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { VENUE_PICKER_COPY as copy } from '~/data/events/venue'

export interface VenuePinStatusProps {
    pinned: boolean
    needsTap: boolean
    readOnly: boolean
    onRemove: () => void
}

function statusMessage({ pinned, needsTap, readOnly }: Omit<VenuePinStatusProps, 'onRemove'>) {
    if (readOnly) return pinned ? copy.pinned : copy.notPinnedReadOnly
    if (needsTap) return copy.tapExact
    return pinned ? `${copy.pinned} ${copy.adjust}` : copy.notPinned
}

export function VenuePinStatus({ pinned, needsTap, readOnly, onRemove }: VenuePinStatusProps) {
    return (
        <div className='flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex items-start gap-2'>
                <MapPin
                    className='mt-1 size-4 shrink-0 text-text-muted'
                    aria-hidden
                />
                <Text
                    variant='small'
                    tone={needsTap ? 'accent' : 'muted'}
                    aria-live='polite'>
                    {statusMessage({ pinned, needsTap, readOnly })}
                </Text>
            </div>
            {pinned && !readOnly && (
                <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={onRemove}>
                    <X />
                    {copy.removePin}
                </Button>
            )}
        </div>
    )
}
