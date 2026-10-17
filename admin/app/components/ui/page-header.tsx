import type { ReactNode } from 'react'
import { Text } from '~/components/ui/text'

export interface PageHeaderProps {
    title: string
    description?: string
    actions?: ReactNode
    eyebrow?: ReactNode
}

export function PageHeader({ title, description, actions, eyebrow }: PageHeaderProps) {
    return (
        <div className='mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between'>
            <div className='min-w-0 space-y-2'>
                {eyebrow}
                <Text
                    as='h1'
                    variant='display'>
                    {title}
                </Text>
                {description && (
                    <Text
                        tone='secondary'
                        className='max-w-2xl'>
                        {description}
                    </Text>
                )}
            </div>
            {actions && <div className='grid gap-3 sm:flex sm:shrink-0 sm:items-center'>{actions}</div>}
        </div>
    )
}
