import { Button } from '~/components/ui/button'
import { ChipRow } from '~/components/ui/chip-row'
import { Text } from '~/components/ui/text'
import { FAQS_JUMP_LABEL } from '~/data/content/faqs'
import type { FaqGroup } from '~/types/content'

export interface FaqJumpProps {
    groups: FaqGroup[]
}

export function FaqJump({ groups }: FaqJumpProps) {
    return (
        <nav
            aria-label={FAQS_JUMP_LABEL}
            className='mb-10 space-y-2 md:mb-14'>
            <Text variant='meta'>{FAQS_JUMP_LABEL}</Text>
            <ChipRow>
                {groups.map(({ id, title }) => (
                    <Button
                        key={id}
                        asChild
                        size='sm'
                        variant='secondary'
                        className='shrink-0'>
                        <a href={`#${id}`}>{title}</a>
                    </Button>
                ))}
            </ChipRow>
        </nav>
    )
}
