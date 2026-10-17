import { Text } from '~/components/ui/text'
import {
    SEGMENT_ITEM_CLASS,
    SEGMENT_SCROLLER_CLASS,
    SEGMENT_STATE_CLASSES,
    SEGMENT_TRACK_CLASS,
} from '~/data/ui/segments'
import { cn } from '~/lib/utils'
import type { SelectOption } from '~/components/ui/select'

export interface SegmentedControlProps<Value extends string> {
    label: string
    options: readonly (SelectOption & { value: Value })[]
    value: Value
    onChange: (value: Value) => void
    className?: string
}

export function SegmentedControl<Value extends string>({
    label,
    options,
    value,
    onChange,
    className,
}: SegmentedControlProps<Value>) {
    return (
        <div className={cn(SEGMENT_SCROLLER_CLASS, className)}>
            <div
                role='group'
                aria-label={label}
                className={SEGMENT_TRACK_CLASS}>
                {options.map((option) => {
                    const active = option.value === value
                    return (
                        <button
                            key={option.value}
                            type='button'
                            aria-pressed={active}
                            onClick={() => onChange(option.value)}
                            className={cn(SEGMENT_ITEM_CLASS, SEGMENT_STATE_CLASSES[active ? 'active' : 'idle'])}>
                            <Text
                                as='span'
                                variant='label'
                                tone='inherit'>
                                {option.label}
                            </Text>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
