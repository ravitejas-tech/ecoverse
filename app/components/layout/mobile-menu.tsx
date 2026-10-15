import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { AnchorLink } from '~/components/ui/anchor-link'
import { Button } from '~/components/ui/button'
import { PopCard } from '~/components/ui/pop-card'
import { NAV_LABELS } from '~/data/layout/landmarks'
import { MOBILE_MENU_ID, MOBILE_MENU_LABELS } from '~/data/layout/menu'
import { NAV_LINKS, PRIMARY_CTA } from '~/data/navigation'

export function MobileMenu() {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!open) return
        const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
        addEventListener('keydown', closeOnEscape)
        return () => removeEventListener('keydown', closeOnEscape)
    }, [open])

    return (
        <div className='lg:hidden'>
            <Button
                variant='secondary'
                size='icon'
                aria-expanded={open}
                aria-controls={MOBILE_MENU_ID}
                aria-label={open ? MOBILE_MENU_LABELS.close : MOBILE_MENU_LABELS.open}
                onClick={() => setOpen(!open)}>
                {open ? <X /> : <Menu />}
            </Button>
            {open && (
                <PopCard
                    id={MOBILE_MENU_ID}
                    className='absolute inset-x-5 top-full mt-3 p-3 md:inset-x-auto md:right-8 md:w-80'>
                    <nav
                        aria-label={NAV_LABELS.mobile}
                        className='flex flex-col'>
                        {NAV_LINKS.map(({ label, href }) => (
                            <AnchorLink
                                key={href}
                                href={href}
                                layout='block'
                                onClick={() => setOpen(false)}>
                                {label}
                            </AnchorLink>
                        ))}
                    </nav>
                    <Button
                        asChild
                        className='mt-3 w-full sm:hidden'>
                        <a
                            href={PRIMARY_CTA.href}
                            onClick={() => setOpen(false)}>
                            {PRIMARY_CTA.label}
                        </a>
                    </Button>
                </PopCard>
            )}
        </div>
    )
}
