import { Search, X } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input, type InputProps } from '~/components/ui/input'
import { cn } from '~/lib/utils'

export interface SearchInputProps extends Omit<InputProps, 'type' | 'value' | 'onChange'> {
    value: string
    onValueChange: (value: string) => void
    clearLabel: string
}

export function SearchInput({ value, onValueChange, clearLabel, className, ...props }: SearchInputProps) {
    return (
        <div className={cn('relative', className)}>
            <Search
                className='pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-text-muted'
                aria-hidden
            />
            <Input
                type='search'
                value={value}
                onChange={(event) => onValueChange(event.target.value)}
                className='pr-12 pl-12'
                {...props}
            />
            {value && (
                <Button
                    type='button'
                    variant='ghost'
                    size='icon-sm'
                    aria-label={clearLabel}
                    onClick={() => onValueChange('')}
                    className='absolute top-1/2 right-2 -translate-y-1/2'>
                    <X />
                </Button>
            )}
        </div>
    )
}
