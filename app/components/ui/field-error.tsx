import { CircleAlert } from 'lucide-react'
import { Text } from '~/components/ui/text'

export interface FieldErrorProps {
    id: string
    children: string
}

export function FieldError({ id, children }: FieldErrorProps) {
    return (
        <Text
            id={id}
            variant='label'
            tone='accent'
            className='flex items-start gap-1.5'>
            <CircleAlert
                className='mt-0.5 size-4 shrink-0'
                aria-hidden
            />
            {children}
        </Text>
    )
}
