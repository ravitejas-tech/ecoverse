import { Chip } from '~/components/ui/chip'
import { Text } from '~/components/ui/text'
import { BRAND_MONOGRAM, BRAND_WORDMARK } from '~/data/brand'

export function Logo() {
    return (
        <span className='inline-flex items-center gap-2.5'>
            <Chip
                aria-hidden
                size='sm'
                tone='pink'
                tilt='hard-left'
                className='group-hover:rotate-6'>
                <Text
                    as='span'
                    variant='title'
                    tone='on-pop'>
                    {BRAND_MONOGRAM}
                </Text>
            </Chip>
            <Text
                as='span'
                variant='title'>
                {BRAND_WORDMARK}
            </Text>
        </span>
    )
}
