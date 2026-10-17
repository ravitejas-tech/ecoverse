import type { ReactNode } from 'react'
import { Chip } from '~/components/ui/chip'
import { PopCard } from '~/components/ui/pop-card'
import { Text } from '~/components/ui/text'
import type { PopTone } from '~/data/ui/pop-tones'
import { cn } from '~/lib/utils'

export interface CheckoutStepProps {
    id: string
    number: string
    title: string
    tone: PopTone
    lead?: string
    className?: string
    children: ReactNode
}

export function CheckoutStep({ id, number, title, tone, lead, className, children }: CheckoutStepProps) {
    const titleId = `${id}-title`

    return (
        <PopCard
            asChild
            className={cn('scroll-mt-24 p-4 sm:p-6', className)}>
            <section
                id={id}
                aria-labelledby={titleId}>
                <div className='mb-5 flex items-center gap-3'>
                    <Chip
                        size='sm'
                        tone={tone}
                        tilt='left'
                        aria-hidden>
                        <Text
                            as='span'
                            variant='title'
                            tone='on-pop'>
                            {number}
                        </Text>
                    </Chip>
                    <Text
                        as='h2'
                        id={titleId}
                        variant='title'>
                        {title}
                    </Text>
                </div>
                {lead && (
                    <Text
                        variant='small'
                        tone='secondary'
                        className='-mt-2 mb-5'>
                        {lead}
                    </Text>
                )}
                {children}
            </section>
        </PopCard>
    )
}
