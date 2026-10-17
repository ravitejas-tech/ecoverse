import { useId } from 'react'
import { Button } from '~/components/ui/button'
import { ChipRow } from '~/components/ui/chip-row'
import { Text } from '~/components/ui/text'

export interface FilterChipsProps {
    label: string
    allLabel: string
    options: { value: string; label: string }[]
    value: string | null
    onChange: (value: string | null) => void
}

export function FilterChips({ label, allLabel, options, value, onChange }: FilterChipsProps) {
    const labelId = useId()
    const chips = [{ value: null, label: allLabel }, ...options]

    return (
        <div className='space-y-2'>
            <Text
                id={labelId}
                variant='meta'>
                {label}
            </Text>
            <ChipRow
                role='group'
                aria-labelledby={labelId}>
                {chips.map((chip) => (
                    <Button
                        key={chip.label}
                        type='button'
                        size='sm'
                        variant={chip.value === value ? 'sunny' : 'secondary'}
                        aria-pressed={chip.value === value}
                        className='shrink-0'
                        onClick={() => onChange(chip.value)}>
                        {chip.label}
                    </Button>
                ))}
            </ChipRow>
        </div>
    )
}
