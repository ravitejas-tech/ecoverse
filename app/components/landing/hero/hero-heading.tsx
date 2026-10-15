import { PopCard } from '~/components/ui/pop-card'
import { Sticker } from '~/components/ui/sticker'
import { Text } from '~/components/ui/text'
import { BRAND_NAME } from '~/data/brand'
import { HERO_EYEBROW, HERO_TITLE_HIGHLIGHT, HERO_TITLE_LEAD, HERO_TITLE_PUNCH } from '~/data/landing/hero'

export function HeroHeading({ className }: { className?: string }) {
    return (
        <div className={className}>
            <Sticker
                tone='yellow'
                tilt='left'>
                {HERO_EYEBROW}
            </Sticker>
            <Text
                as='h1'
                variant='hero'
                className='mt-6 sm:mt-8'>
                <Text
                    as='span'
                    variant='inherit'
                    className='sr-only'>
                    {`${BRAND_NAME}: `}
                </Text>
                {HERO_TITLE_LEAD} <br />
                {HERO_TITLE_PUNCH}{' '}
                <PopCard
                    asChild
                    tone='pink'
                    tilt='left'
                    className='mt-3 inline-block px-3 pb-2'>
                    <Text
                        as='span'
                        variant='inherit'
                        tone='on-pop'>
                        {HERO_TITLE_HIGHLIGHT}
                    </Text>
                </PopCard>
            </Text>
        </div>
    )
}
