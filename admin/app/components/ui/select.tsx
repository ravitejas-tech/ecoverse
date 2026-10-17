import type { Ref, SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { CONTROL_CLASS } from '~/data/ui/control'
import { cn } from '~/lib/utils'

export interface SelectOption {
    value: string
    label: string
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: readonly SelectOption[]
    placeholder?: string
    ref?: Ref<HTMLSelectElement>
}

export function Select({ options, placeholder, className, ...props }: SelectProps) {
    return (
        <div className={cn('relative', className)}>
            <select
                className={cn(CONTROL_CLASS, 'h-12 appearance-none pr-10')}
                {...props}>
                {placeholder && <option value=''>{placeholder}</option>}
                {options.map(({ value, label }) => (
                    <option
                        key={value}
                        value={value}>
                        {label}
                    </option>
                ))}
            </select>
            <ChevronDown
                className='pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-text-muted'
                aria-hidden
            />
        </div>
    )
}
