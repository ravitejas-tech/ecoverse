import { NavLink } from 'react-router'
import { Text } from '~/components/ui/text'
import { NAV_ITEMS, SHELL_COPY } from '~/data/layout/navigation'
import { useStaff } from '~/hooks/staff/use-staff'
import { can } from '~/lib/permissions'
import { cn } from '~/lib/utils'

export function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
    const { role } = useStaff()

    return (
        <nav aria-label={SHELL_COPY.navLabel}>
            <ul className='space-y-1'>
                {NAV_ITEMS.filter(({ permission }) => can(role, permission)).map(({ label, to, icon: Icon, end }) => (
                    <li key={to}>
                        <NavLink
                            to={to}
                            end={end}
                            onClick={onNavigate}
                            className={({ isActive }) =>
                                cn(
                                    'flex items-center gap-3 rounded-xl border-2 px-3 py-2.5 transition',
                                    isActive
                                        ? 'border-border bg-pop-yellow text-on-pop shadow-pop-sm'
                                        : 'border-transparent hover:bg-surface-muted',
                                )
                            }>
                            <Icon
                                className='size-5 shrink-0'
                                aria-hidden
                            />
                            <Text
                                as='span'
                                variant='label'
                                tone='inherit'>
                                {label}
                            </Text>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
