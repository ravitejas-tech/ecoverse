import { FooterContact } from '~/components/layout/footer-contact'
import { FooterLinks } from '~/components/layout/footer-links'
import { Container } from '~/components/ui/container'
import { Logo } from '~/components/ui/logo'
import { Text } from '~/components/ui/text'
import { BRAND_TAGLINE } from '~/data/brand'
import { FOOTER_COPYRIGHT, FOOTER_LINK_GROUPS, FOOTER_SCRAWL } from '~/data/layout/footer'
import { NAV_LABELS } from '~/data/layout/landmarks'

export function Footer() {
    return (
        <footer className='border-t-2 border-border bg-surface'>
            <Container className='grid gap-10 py-12 md:py-16 lg:grid-cols-5 lg:gap-12'>
                <div className='space-y-4 lg:col-span-2'>
                    <Logo size='full' />
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
                    <FooterContact />
                </div>
                <nav
                    aria-label={NAV_LABELS.footer}
                    className='grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3'>
                    {FOOTER_LINK_GROUPS.map((group) => (
                        <FooterLinks
                            key={group.title}
                            group={group}
                        />
                    ))}
                </nav>
            </Container>
            <div className='border-t-2 border-border'>
                <Container className='py-6'>
                    <Text
                        variant='small'
                        tone='muted'>
                        {FOOTER_COPYRIGHT}
                    </Text>
                </Container>
            </div>
        </footer>
    )
}
