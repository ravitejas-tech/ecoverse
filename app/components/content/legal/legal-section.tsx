import { BulletList } from '~/components/ui/bullet-list'
import { Text } from '~/components/ui/text'
import type { LegalSection as LegalSectionContent } from '~/types/content'

export interface LegalSectionProps {
    number: number
    section: LegalSectionContent
}

export function LegalSection({ number, section: { heading, paragraphs, points } }: LegalSectionProps) {
    return (
        <section className='space-y-4'>
            <Text
                as='h2'
                variant='heading'>
                {`${number}. ${heading}`}
            </Text>
            {paragraphs.map((paragraph) => (
                <Text
                    key={paragraph}
                    tone='secondary'>
                    {paragraph}
                </Text>
            ))}
            {points && (
                <BulletList
                    items={points}
                    bullet='dot'
                />
            )}
        </section>
    )
}
