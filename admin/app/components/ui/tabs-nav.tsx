import { NavLink } from 'react-router'
import { Text } from '~/components/ui/text'
import { SEGMENT_STATE_CLASSES, TABS_ITEM_CLASS, TABS_TRACK_CLASS } from '~/data/ui/segments'
import { cn } from '~/lib/utils'

export interface TabsNavItem {
    label: string
    to: string
    end?: boolean
}

export function TabsNav({ items, label }: { items: readonly TabsNavItem[]; label: string }) {
    return (
        <nav
            aria-label={label}
            className='mb-6'>
            <ul className={TABS_TRACK_CLASS}>
                {items.map(({ label: itemLabel, to, end }) => (
                    <li key={to}>
                        <NavLink
                            to={to}
                            end={end}
                            className={({ isActive }) =>
                                cn(TABS_ITEM_CLASS, SEGMENT_STATE_CLASSES[isActive ? 'active' : 'idle'])
                            }>
                            <Text
                                as='span'
                                variant='label'
                                tone='inherit'>
                                {itemLabel}
                            </Text>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
