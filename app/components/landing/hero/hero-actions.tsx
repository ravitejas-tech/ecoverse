import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { Button } from '~/components/ui/button'
import { ButtonRow } from '~/components/ui/button-row'
import { Text } from '~/components/ui/text'
import { HERO_LEAD, HERO_SCRAWL, HERO_SECONDARY_CTA } from '~/data/landing/hero'
import { PATHS, PRIMARY_CTA_LABEL, SECTION_IDS, sectionHref } from '~/data/navigation'

export function HeroActions({ className }: { className?: string }) {
    return (
        <div className={className}>
            <Text
                variant='lead'
                tone='secondary'
                className='mb-8 hidden max-w-xl sm:block'>
                {HERO_LEAD}
            </Text>
            <ButtonRow className='sm:items-center sm:gap-4'>
                <Button
                    asChild
                    size='lg'>
                    <Link to={PATHS.events}>
                        {PRIMARY_CTA_LABEL}
                        <ArrowRight aria-hidden />
                    </Link>
                </Button>
                <Button
                    asChild
                    size='lg'
                    variant='secondary'
                    className='hidden sm:inline-flex'>
                    <a href={sectionHref(SECTION_IDS.journey)}>{HERO_SECONDARY_CTA}</a>
                </Button>
            </ButtonRow>
            <Text
                variant='marker'
                tone='accent'
                className='mt-5 -rotate-2 text-center sm:mt-8 sm:text-left'>
                {HERO_SCRAWL}
            </Text>
        </div>
    )
}
