import type { InputHTMLAttributes, ReactNode, Ref } from 'react'
import { Check } from 'lucide-react'
import { cn } from '~/lib/utils'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
    children: ReactNode
    ref?: Ref<HTMLInputElement>
}

export function Checkbox({ children, className, ...props }: CheckboxProps) {
    return (
        <label className={cn('flex cursor-pointer items-start gap-3', className)}>
            <span className='relative mt-0.5 grid size-6 shrink-0 place-items-center'>
                <input
                    type='checkbox'
                    className={cn(
                        'peer size-6 cursor-pointer appearance-none rounded-lg border-2 bg-surface shadow-pop-sm transition checked:bg-pop-lime focus-visible:ring-4 focus-visible:ring-pop-cyan focus-visible:outline-none',
                        props['aria-invalid'] === true ? 'border-accent-text' : 'border-border',
                    )}
                    {...props}
                />
                <Check
                    className='pointer-events-none absolute size-4 stroke-3 text-on-pop opacity-0 peer-checked:opacity-100'
                    aria-hidden
                />
            </span>
            {children}
        </label>
    )
}
