import { Text } from '~/components/ui/text'
import { MARQUEE_ITEMS, MARQUEE_SEPARATOR } from '~/data/landing/marquee'

const LOOP = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

export function MarqueeBand() {
    return (
        <div
            className='relative z-10 -my-3 -rotate-1 overflow-hidden border-y-2 border-border bg-pop-yellow py-4 shadow-pop'
            aria-hidden>
            <div className='flex w-max animate-marquee gap-8 motion-reduce:animate-none'>
                {LOOP.map((item, index) => (
                    <Text
                        key={`${item}-${index}`}
                        as='span'
                        variant='shout'
                        tone='on-pop'
                        className='flex items-center gap-8 whitespace-nowrap'>
                        {item}
                        <span>{MARQUEE_SEPARATOR}</span>
                    </Text>
                ))}
            </div>
        </div>
    )
}
