import { useId, type ReactNode } from 'react'
import { Text } from '~/components/ui/text'

export interface DetailBlockProps {
    title: string
    children: ReactNode
}

export function DetailBlock({ title, children }: DetailBlockProps) {
    const titleId = useId()

    return (
        <section
            aria-labelledby={titleId}
            className='space-y-5'>
            <Text
                as='h2'
                id={titleId}
                variant='heading'>
                {title}
            </Text>
            {children}
        </section>
    )
}
