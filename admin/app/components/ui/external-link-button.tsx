import type { ReactNode } from 'react'
import { ExternalLink } from 'lucide-react'
import { Button, type ButtonProps } from '~/components/ui/button'

export interface ExternalLinkButtonProps extends Pick<ButtonProps, 'variant' | 'size' | 'className'> {
    href: string
    children: ReactNode
}

export function ExternalLinkButton({ href, children, variant = 'secondary', ...props }: ExternalLinkButtonProps) {
    return (
        <Button
            asChild
            variant={variant}
            {...props}>
            <a
                href={href}
                target='_blank'
                rel='noopener noreferrer'>
                <ExternalLink />
                {children}
            </a>
        </Button>
    )
}
