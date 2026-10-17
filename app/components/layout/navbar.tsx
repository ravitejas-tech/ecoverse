import { Link } from 'react-router'
import { MobileMenu } from '~/components/layout/mobile-menu'
import { AnchorLink } from '~/components/ui/anchor-link'
import { Button } from '~/components/ui/button'
import { Container } from '~/components/ui/container'
import { Logo } from '~/components/ui/logo'
import { ThemeToggle } from '~/components/ui/theme-toggle'
import { NAV_LABELS } from '~/data/layout/landmarks'
import { NAV_LINKS, PATHS, PRIMARY_CTA_LABEL } from '~/data/navigation'

export function Navbar() {
    return (
        <header className='sticky top-0 z-40 border-b-2 border-border bg-bg/85 backdrop-blur-md'>
            <Container className='flex h-16 items-center justify-between gap-4 sm:h-18'>
                <Link
                    to={PATHS.home}
                    className='group rounded-xl focus-visible:ring-4 focus-visible:ring-pop-cyan focus-visible:outline-none'>
                    <Logo />
                </Link>
                <nav
                    aria-label={NAV_LABELS.primary}
                    className='hidden items-center gap-4 lg:flex xl:gap-6'>
                    {NAV_LINKS.map(({ label, to }) => (
                        <AnchorLink
                            key={to}
                            to={to}>
                            {label}
                        </AnchorLink>
                    ))}
                </nav>
                <div className='flex items-center gap-3'>
                    <ThemeToggle />
                    <Button
                        asChild
                        size='sm'
                        className='hidden sm:inline-flex'>
                        <Link to={PATHS.events}>{PRIMARY_CTA_LABEL}</Link>
                    </Button>
                    <MobileMenu />
                </div>
            </Container>
        </header>
    )
}
