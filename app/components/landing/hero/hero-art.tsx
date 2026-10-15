import { TicketPreview } from '~/components/landing/hero/ticket-preview'
import { Sticker } from '~/components/ui/sticker'
import { HERO_STICKERS } from '~/data/landing/hero'
import { cn } from '~/lib/utils'

export function HeroArt({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                'relative mx-auto w-full max-w-xs motion-safe:animate-float sm:max-w-sm lg:max-w-md',
                className,
            )}>
            <div className='hidden sm:contents'>
                <div
                    className='absolute -top-10 -right-8 size-28 rounded-full border-2 border-border bg-pop-violet motion-safe:animate-spin-slow'
                    aria-hidden
                />
                <div
                    className='absolute -bottom-8 -left-10 size-20 rotate-12 rounded-2xl border-2 border-border bg-pop-cyan'
                    aria-hidden
                />
            </div>
            <TicketPreview />
            <div className='hidden sm:contents'>
                {HERO_STICKERS.map(({ label, tone, tilt, placement }) => (
                    <Sticker
                        key={label}
                        tone={tone}
                        tilt={tilt}
                        className={cn('absolute z-10 motion-safe:animate-wiggle', placement)}>
                        {label}
                    </Sticker>
                ))}
            </div>
        </div>
    )
}
