import { ExternalLink, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { ThemeToggle } from '~/components/ui/theme-toggle'
import { AUTH_PATHS } from '~/data/auth/session'
import { SHELL_COPY } from '~/data/layout/navigation'
import { ROLE_LABELS } from '~/data/staff/roles'
import { useStaff } from '~/hooks/staff/use-staff'
import { signOut } from '~/services/auth'

export function UserPanel() {
    const { name, email, role } = useStaff()
    const navigate = useNavigate()

    return (
        <div className='space-y-3 border-t-2 border-border pt-4'>
            <div className='min-w-0 space-y-1'>
                <Text
                    variant='label'
                    className='truncate'>
                    {name}
                </Text>
                <Text
                    variant='small'
                    tone='muted'
                    className='truncate'>
                    {email}
                </Text>
                <Badge tone='cyan'>{ROLE_LABELS[role]}</Badge>
            </div>
            <div className='flex items-center gap-2'>
                <ThemeToggle />
                <Button
                    asChild
                    variant='secondary'
                    size='icon'
                    aria-label={SHELL_COPY.openWebsite}
                    title={SHELL_COPY.openWebsite}>
                    <a
                        href={import.meta.env.VITE_WEBSITE_URL}
                        target='_blank'
                        rel='noopener noreferrer'>
                        <ExternalLink />
                    </a>
                </Button>
                <Button
                    variant='secondary'
                    size='sm'
                    className='flex-1'
                    onClick={() => void signOut().then(() => navigate(AUTH_PATHS.login))}>
                    <LogOut />
                    {SHELL_COPY.signOut}
                </Button>
            </div>
        </div>
    )
}
