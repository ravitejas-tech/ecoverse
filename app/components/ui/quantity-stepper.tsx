import { Minus, Plus } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'

export interface QuantityStepperProps {
    value: number
    canDecrease: boolean
    canIncrease: boolean
    onChange: (delta: 1 | -1) => void
    label: string
    decreaseLabel: string
    increaseLabel: string
}

export function QuantityStepper({
    value,
    canDecrease,
    canIncrease,
    onChange,
    label,
    decreaseLabel,
    increaseLabel,
}: QuantityStepperProps) {
    return (
        <div
            role='group'
            aria-label={label}
            className='flex shrink-0 items-center gap-1.5'>
            <Button
                type='button'
                variant='secondary'
                size='icon'
                disabled={!canDecrease}
                onClick={() => onChange(-1)}
                aria-label={decreaseLabel}>
                <Minus />
            </Button>
            <Text
                as='span'
                variant='title'
                className='w-8 text-center'
                aria-live='polite'>
                {String(value)}
            </Text>
            <Button
                type='button'
                variant={value > 0 ? 'primary' : 'secondary'}
                size='icon'
                disabled={!canIncrease}
                onClick={() => onChange(1)}
                aria-label={increaseLabel}>
                <Plus />
            </Button>
        </div>
    )
}
