import { Link, type LinkProps } from 'react-router'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

export interface TextLinkProps extends Omit<LinkProps, 'children'> {
    children: string
}

export function TextLink({ children, className, ...props }: TextLinkProps) {
    return (
        <Link
            className={cn(
                'rounded-sm underline decoration-accent-text decoration-2 underline-offset-4 transition hover:decoration-wavy focus-visible:ring-4 focus-visible:ring-pop-cyan focus-visible:outline-none',
                className,
            )}
            {...props}>
            <Text
                as='span'
                variant='label'
                tone='accent'>
                {children}
            </Text>
        </Link>
    )
}
