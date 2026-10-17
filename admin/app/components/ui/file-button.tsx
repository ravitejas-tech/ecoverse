import { useRef, type ReactNode } from 'react'
import { Button, type ButtonProps } from '~/components/ui/button'

export interface FileButtonProps extends Pick<ButtonProps, 'variant' | 'size' | 'disabled' | 'className'> {
    accept: string
    onFile?: (file: File) => void
    onFiles?: (files: File[]) => void
    children: ReactNode
}

export function FileButton({ accept, onFile, onFiles, children, ...buttonProps }: FileButtonProps) {
    const input = useRef<HTMLInputElement>(null)

    return (
        <>
            <input
                ref={input}
                type='file'
                accept={accept}
                multiple={Boolean(onFiles)}
                className='sr-only'
                tabIndex={-1}
                aria-hidden
                onChange={(event) => {
                    const files = Array.from(event.target.files ?? [])
                    event.target.value = ''
                    onFiles?.(files)
                    if (files[0]) onFile?.(files[0])
                }}
            />
            <Button
                type='button'
                {...buttonProps}
                onClick={() => input.current?.click()}>
                {children}
            </Button>
        </>
    )
}
