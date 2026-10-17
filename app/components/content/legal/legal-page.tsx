import { Mail } from 'lucide-react'
import { LegalSection } from '~/components/content/legal/legal-section'
import { Button } from '~/components/ui/button'
import { EmptyState } from '~/components/ui/empty-state'
import { PopCard } from '~/components/ui/pop-card'
import { Section } from '~/components/ui/section'
import { SectionHeading } from '~/components/ui/section-heading'
import { Sticker } from '~/components/ui/sticker'
import { Text } from '~/components/ui/text'
import { EMAIL } from '~/data/contact'
import { LEGAL_COPY } from '~/data/legal/common'
import { formatFullDate } from '~/lib/format'
import type { LegalDocument } from '~/types/content'

export interface LegalPageProps {
    document: LegalDocument
}

export function LegalPage({ document: { eyebrow, title, lead, updatedAt, sections } }: LegalPageProps) {
    return (
        <Section>
            <div className='mx-auto max-w-3xl'>
                <SectionHeading
                    level='h1'
                    eyebrow={eyebrow}
                    title={title}
                    lead={lead}
                    tone='violet'
                    className='md:mb-10'
                />
                <PopCard
                    tone='yellow'
                    className='mb-12 space-y-3 p-5 sm:p-6'>
                    <Sticker
                        tone='orange'
                        tilt='left'>
                        {LEGAL_COPY.reviewSticker}
                    </Sticker>
                    <Text tone='on-pop'>{LEGAL_COPY.reviewNote}</Text>
                    <Text
                        variant='meta'
                        tone='on-pop'>
                        {`${LEGAL_COPY.updated}: ${formatFullDate(updatedAt)}`}
                    </Text>
                </PopCard>
                <div className='space-y-10'>
                    {sections.map((section, index) => (
                        <LegalSection
                            key={section.heading}
                            number={index + 1}
                            section={section}
                        />
                    ))}
                </div>
                <div className='mt-14'>
                    <EmptyState
                        emoji={LEGAL_COPY.questionsEmoji}
                        title={LEGAL_COPY.questions}
                        body={LEGAL_COPY.questionsBody}
                        tone='cyan'
                        action={
                            <Button
                                asChild
                                variant='secondary'>
                                <a href={EMAIL.href}>
                                    <Mail aria-hidden />
                                    {EMAIL.address}
                                </a>
                            </Button>
                        }
                    />
                </div>
            </div>
        </Section>
    )
}
