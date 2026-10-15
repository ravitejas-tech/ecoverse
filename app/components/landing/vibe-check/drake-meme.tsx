import { MemeRow } from '~/components/landing/vibe-check/meme-row'
import { PopCard } from '~/components/ui/pop-card'
import type { Tilt } from '~/data/ui/tilts'
import type { DrakeMemeContent } from '~/types/landing'

export interface DrakeMemeProps {
    meme: DrakeMemeContent
    tilt: Tilt
}

export function DrakeMeme({ meme: { nope, yep }, tilt }: DrakeMemeProps) {
    return (
        <PopCard
            tilt={tilt}
            interactive
            className='flex h-full flex-col overflow-hidden'>
            <MemeRow verdict='nope'>{nope}</MemeRow>
            <MemeRow
                verdict='yep'
                className='border-t-2 border-border'>
                {yep}
            </MemeRow>
        </PopCard>
    )
}
