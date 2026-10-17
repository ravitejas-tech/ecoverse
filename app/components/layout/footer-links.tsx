import { AnchorLink } from '~/components/ui/anchor-link'
import { Text } from '~/components/ui/text'
import { FOOTER_LINK_GROUPS } from '~/data/layout/footer'

export interface FooterLinksProps {
    group: (typeof FOOTER_LINK_GROUPS)[number]
}

export function FooterLinks({ group: { title, links } }: FooterLinksProps) {
    return (
        <div className='space-y-3'>
            <Text
                as='h2'
                variant='meta'>
                {title}
            </Text>
            <ul>
                {links.map(({ label, to }) => (
                    <li key={to}>
                        <AnchorLink
                            to={to}
                            layout='list'
                            className='-ml-1'>
                            {label}
                        </AnchorLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}
