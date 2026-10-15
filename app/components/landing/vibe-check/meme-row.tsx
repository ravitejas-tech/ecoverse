import { cva } from 'class-variance-authority'
import { Text } from '~/components/ui/text'
import { DRAKE_EMOJI } from '~/data/landing/vibe-check'
import { cn } from '~/lib/utils'

const panelVariants = cva('grid w-16 shrink-0 place-items-center border-r-2 border-border sm:w-24', {
    variants: { verdict: { nope: 'bg-pop-orange', yep: 'bg-pop-lime' } },
})

export interface MemeRowProps {
    verdict: keyof typeof DRAKE_EMOJI
    children: string
    className?: string
}

export function MemeRow({ verdict, children, className }: MemeRowProps) {
    return (
        <div className={cn('flex min-h-28 flex-1 sm:min-h-32', className)}>
            <div className={panelVariants({ verdict })}>
                <Text
                    variant='emoji'
                    aria-hidden>
                    {DRAKE_EMOJI[verdict]}
                </Text>
            </div>
            <Text
                variant={verdict === 'yep' ? 'label' : 'small'}
                tone={verdict === 'yep' ? 'primary' : 'muted'}
                className='self-center p-4 sm:p-5'>
                {children}
            </Text>
        </div>
    )
}
