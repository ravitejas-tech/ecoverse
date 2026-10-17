import type { ReactNode } from 'react'
import { Text } from '~/components/ui/text'

export interface DetailItem {
    label: string
    value: ReactNode
}

export function DetailList({ items }: { items: readonly DetailItem[] }) {
    return (
        <dl className='grid gap-x-6 gap-y-4 sm:grid-cols-2'>
            {items.map(({ label, value }) => (
                <div
                    key={label}
                    className='min-w-0 space-y-1'>
                    <Text
                        as='dt'
                        variant='meta'>
                        {label}
                    </Text>
                    <Text
                        as='dd'
                        className='break-words'>
                        {value}
                    </Text>
                </div>
            ))}
        </dl>
    )
}
