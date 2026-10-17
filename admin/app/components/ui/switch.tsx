import type { InputHTMLAttributes, Ref } from 'react'
import { Text } from '~/components/ui/text'

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label: string
    description?: string
    ref?: Ref<HTMLInputElement>
}

export function Switch({ label, description, id, ...props }: SwitchProps) {
    return (
        <label
            htmlFor={id}
            className='flex cursor-pointer items-start justify-between gap-4 rounded-xl border-2 border-border bg-surface px-4 py-3'>
            <span className='space-y-0.5'>
                <Text
                    as='span'
                    variant='label'
                    className='block'>
                    {label}
                </Text>
                {description && (
                    <Text
                        as='span'
                        variant='small'
                        tone='muted'
                        className='block'>
                        {description}
                    </Text>
                )}
            </span>
            <input
                id={id}
                type='checkbox'
                role='switch'
                className='peer sr-only'
                {...props}
            />
            <span
                aria-hidden
                className='relative mt-0.5 h-7 w-12 shrink-0 rounded-full border-2 border-border bg-surface-muted transition peer-checked:bg-pop-lime peer-focus-visible:ring-4 peer-focus-visible:ring-pop-cyan after:absolute after:top-0.5 after:left-0.5 after:size-5 after:rounded-full after:border-2 after:border-border after:bg-surface after:transition peer-checked:after:translate-x-5'
            />
        </label>
    )
}
