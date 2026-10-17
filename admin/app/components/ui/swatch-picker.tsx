import { Check } from 'lucide-react'
import { Text } from '~/components/ui/text'
import { POP_FILLS, type PopTone } from '~/data/ui/pop-tones'
import { cn } from '~/lib/utils'

export interface SwatchPickerProps {
    name: string
    label: string
    value: PopTone
    options: readonly { value: PopTone; label: string }[]
    onChange: (value: PopTone) => void
    disabled?: boolean
}

export function SwatchPicker({ name, label, value, options, onChange, disabled }: SwatchPickerProps) {
    return (
        <fieldset
            className='space-y-2'
            disabled={disabled}>
            <Text
                as='span'
                variant='label'
                className='block'>
                {label}
            </Text>
            <div className='flex flex-wrap gap-3'>
                {options.map((option) => (
                    <label
                        key={option.value}
                        title={option.label}
                        className='cursor-pointer'>
                        <input
                            type='radio'
                            name={name}
                            value={option.value}
                            checked={option.value === value}
                            onChange={() => onChange(option.value)}
                            className='peer sr-only'
                        />
                        <span
                            aria-hidden
                            className={cn(
                                'grid size-11 place-items-center rounded-full border-2 border-border text-on-pop shadow-pop-sm transition peer-checked:scale-110 peer-focus-visible:ring-4 peer-focus-visible:ring-pop-cyan [&_svg]:hidden peer-checked:[&_svg]:block',
                                POP_FILLS[option.value],
                            )}>
                            <Check className='size-5' />
                        </span>
                        <Text
                            as='span'
                            variant='small'
                            className='sr-only'>
                            {option.label}
                        </Text>
                    </label>
                ))}
            </div>
        </fieldset>
    )
}
