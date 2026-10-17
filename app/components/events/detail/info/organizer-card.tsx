import { Link } from 'react-router'
import { DetailBlock } from '~/components/events/detail/info/detail-block'
import { Button } from '~/components/ui/button'
import { ButtonRow } from '~/components/ui/button-row'
import { Logo } from '~/components/ui/logo'
import { PopCard } from '~/components/ui/pop-card'
import { Text } from '~/components/ui/text'
import { WhatsAppButton } from '~/components/ui/whatsapp-button'
import { WHATSAPP_MESSAGES } from '~/data/contact'
import { EVENT_SECTIONS, ORGANIZER_COPY } from '~/data/events/page'
import { PATHS } from '~/data/navigation'

export function OrganizerCard() {
    return (
        <DetailBlock title={EVENT_SECTIONS.organizer}>
            <PopCard className='space-y-4 p-5 sm:p-6'>
                <Logo />
                <Text tone='secondary'>{ORGANIZER_COPY.body}</Text>
                <ButtonRow>
                    <WhatsAppButton message={WHATSAPP_MESSAGES.help} />
                    <Button
                        asChild
                        variant='ghost'>
                        <Link to={PATHS.about}>{ORGANIZER_COPY.about}</Link>
                    </Button>
                </ButtonRow>
            </PopCard>
        </DetailBlock>
    )
}
