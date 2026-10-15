import { ArrowRight } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import { WhatsAppLink } from '~/components/ui/whatsapp-link'
import { WHATSAPP_MESSAGES } from '~/data/contact'
import { HERO_LEAD, HERO_SCRAWL, HERO_SECONDARY_CTA } from '~/data/landing/hero'
import { PRIMARY_CTA_LABEL, SECTION_IDS, sectionHref } from '~/data/navigation'

export function HeroActions({ className }: { className?: string }) {
    return (
        <div className={className}>
            <Text
                variant='lead'
                tone='secondary'
                className='mb-8 hidden max-w-xl sm:block'>
                {HERO_LEAD}
            </Text>
            <div className='grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-4'>
                <Button
                    asChild
                    size='lg'>
                    <WhatsAppLink message={WHATSAPP_MESSAGES.explore}>
                        {PRIMARY_CTA_LABEL}
                        <ArrowRight />
                    </WhatsAppLink>
                </Button>
                <Button
                    asChild
                    size='lg'
                    variant='secondary'
                    className='hidden sm:inline-flex'>
                    <a href={sectionHref(SECTION_IDS.journey)}>{HERO_SECONDARY_CTA}</a>
                </Button>
            </div>
            <Text
                variant='marker'
                tone='accent'
                className='mt-5 -rotate-2 text-center sm:mt-8 sm:text-left'>
                {HERO_SCRAWL}
            </Text>
        </div>
    )
}
