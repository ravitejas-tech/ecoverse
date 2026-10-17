import { LoaderCircle } from 'lucide-react'
import { Text } from '~/components/ui/text'

export function Spinner({ label }: { label: string }) {
    return (
        <div
            role='status'
            className='flex items-center justify-center gap-3 py-16'>
            <LoaderCircle
                className='size-6 motion-safe:animate-spin'
                aria-hidden
            />
            <Text
                as='span'
                variant='label'
                tone='secondary'>
                {label}
            </Text>
        </div>
    )
}
