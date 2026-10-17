import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { Text } from '~/components/ui/text'

export interface DisclosureProps {
    title: string
    children: ReactNode
}

export function Disclosure({ title, children }: DisclosureProps) {
    return (
        <details className='group rounded-2xl border-2 border-border bg-surface shadow-pop-sm transition open:shadow-pop'>
            <summary className='flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-4 py-3 focus-visible:ring-4 focus-visible:ring-pop-cyan focus-visible:outline-none sm:px-5 [&::-webkit-details-marker]:hidden'>
                <Text
                    as='span'
                    variant='subtitle'>
                    {title}
                </Text>
                <ChevronDown
                    className='size-5 shrink-0 transition group-open:rotate-180 motion-reduce:transition-none'
                    aria-hidden
                />
            </summary>
            <div className='space-y-3 px-4 pb-5 sm:px-5'>{children}</div>
        </details>
    )
}
