import { Link } from 'react-router'
import { Badge } from '~/components/ui/badge'
import { Logo } from '~/components/ui/logo'
import { AUTH_PATHS } from '~/data/auth/session'
import { SHELL_COPY } from '~/data/layout/navigation'

export function Brand() {
    return (
        <Link
            to={AUTH_PATHS.home}
            className='flex items-center gap-2'>
            <Logo />
            <Badge tone='pink'>{SHELL_COPY.productBadge}</Badge>
        </Link>
    )
}
