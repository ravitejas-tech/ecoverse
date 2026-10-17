import type { InputHTMLAttributes, Ref } from 'react'
import { Text } from '~/components/ui/text'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label: string
    ref?: Ref<HTMLInputElement>
}

export function Checkbox({ label, id, ...props }: CheckboxProps) {
    return (
        <label
            htmlFor={id}
            className='flex cursor-pointer items-center gap-3'>
            <input
                id={id}
                type='checkbox'
                className='size-5 shrink-0 cursor-pointer rounded-md border-2 border-border accent-accent'
                {...props}
            />
            <Text
                as='span'
                variant='small'>
                {label}
            </Text>
        </label>
    )
}
