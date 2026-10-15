import { FramedPhoto } from '~/components/ui/framed-photo'
import { PopCard } from '~/components/ui/pop-card'
import { Text } from '~/components/ui/text'
import type { Tilt } from '~/data/ui/tilts'
import type { Shoutout } from '~/types/landing'

export interface PolaroidProps {
    shoutout: Shoutout
    tilt: Tilt
}

export function Polaroid({ shoutout: { quote, handle, tone, photo }, tilt }: PolaroidProps) {
    return (
        <PopCard
            asChild
            tilt={tilt}
            interactive
            className='flex h-full flex-col gap-4 p-3 pb-6'>
            <figure>
                <FramedPhoto
                    photo={photo}
                    tone={tone}
                    shape='square'
                />
                <Text
                    as='blockquote'
                    variant='label'
                    className='px-2'>
                    {`“${quote}”`}
                </Text>
                <Text
                    as='figcaption'
                    variant='marker'
                    tone='accent'
                    className='mt-auto px-2'>
                    {`— ${handle}`}
                </Text>
            </figure>
        </PopCard>
    )
}
