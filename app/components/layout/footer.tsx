import { AnchorLink } from '~/components/ui/anchor-link'
import { Container } from '~/components/ui/container'
import { Logo } from '~/components/ui/logo'
import { Text } from '~/components/ui/text'
import { BRAND_TAGLINE } from '~/data/brand'
import { FOOTER_COPYRIGHT, FOOTER_SCRAWL } from '~/data/landing/footer'
import { NAV_LABELS } from '~/data/layout/landmarks'
import { NAV_LINKS } from '~/data/navigation'

export function Footer() {
    return (
        <footer className='border-t-2 border-border bg-surface'>
            <Container className='flex flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between'>
                <div className='space-y-4'>
                    <Logo />
                    <Text
                        variant='title'
                        className='max-w-sm'>
                        {BRAND_TAGLINE}
                    </Text>
                    <Text
                        variant='marker'
                        tone='accent'>
                        {FOOTER_SCRAWL}
                    </Text>
                </div>
                <div className='space-y-6 md:text-right'>
                    <nav
                        aria-label={NAV_LABELS.footer}
                        className='flex flex-wrap gap-x-6 gap-y-3 md:justify-end'>
                        {NAV_LINKS.map(({ label, href }) => (
                            <AnchorLink
                                key={href}
                                href={href}>
                                {label}
                            </AnchorLink>
                        ))}
                    </nav>
                    <Text
                        variant='small'
                        tone='muted'>
                        {FOOTER_COPYRIGHT}
                    </Text>
                </div>
            </Container>
        </footer>
    )
}
