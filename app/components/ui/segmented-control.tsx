import { Button } from '~/components/ui/button'

export interface SegmentedControlProps<Value extends string> {
    label: string
    options: { value: Value; label: string }[]
    value: Value
    onChange: (value: Value) => void
}

export function SegmentedControl<Value extends string>({
    label,
    options,
    value,
    onChange,
}: SegmentedControlProps<Value>) {
    return (
        <div
            role='group'
            aria-label={label}
            className='inline-flex gap-1 rounded-full border-2 border-border bg-surface p-1 shadow-pop-sm'>
            {options.map((option) => (
                <Button
                    key={option.value}
                    type='button'
                    size='sm'
                    chunky={false}
                    variant={option.value === value ? 'sunny' : 'ghost'}
                    aria-pressed={option.value === value}
                    className='min-w-28'
                    onClick={() => onChange(option.value)}>
                    {option.label}
                </Button>
            ))}
        </div>
    )
}
