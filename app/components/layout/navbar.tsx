import { Link } from 'react-router'
import { MobileMenu } from '~/components/layout/mobile-menu'
import { AnchorLink } from '~/components/ui/anchor-link'
import { Button } from '~/components/ui/button'
import { Container } from '~/components/ui/container'
import { Logo } from '~/components/ui/logo'
import { ThemeToggle } from '~/components/ui/theme-toggle'
import { WhatsAppLink } from '~/components/ui/whatsapp-link'
import { WHATSAPP_MESSAGES } from '~/data/contact'
import { NAV_LABELS } from '~/data/layout/landmarks'
import { HOME_PATH, NAV_LINKS, PRIMARY_CTA_LABEL } from '~/data/navigation'

export function Navbar() {
    return (
        <header className='sticky top-0 z-40 border-b-2 border-border bg-bg/85 backdrop-blur-md'>
            <Container className='flex h-16 items-center justify-between gap-4 sm:h-18'>
                <Link
                    to={HOME_PATH}
                    className='group'>
                    <Logo />
                </Link>
                <nav
                    aria-label={NAV_LABELS.primary}
                    className='hidden items-center gap-6 lg:flex'>
                    {NAV_LINKS.map(({ label, href }) => (
                        <AnchorLink
                            key={href}
                            href={href}>
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
                        <WhatsAppLink message={WHATSAPP_MESSAGES.explore}>{PRIMARY_CTA_LABEL}</WhatsAppLink>
                    </Button>
                    <MobileMenu />
                </div>
            </Container>
        </header>
    )
}
