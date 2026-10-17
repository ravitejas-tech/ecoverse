import { Disclosure } from '~/components/ui/disclosure'
import { Text } from '~/components/ui/text'
import type { QuestionAnswer } from '~/types/content'

export interface AccordionProps {
    items: QuestionAnswer[]
}

export function Accordion({ items }: AccordionProps) {
    return (
        <div className='space-y-3'>
            {items.map(({ question, answer }) => (
                <Disclosure
                    key={question}
                    title={question}>
                    <Text tone='secondary'>{answer}</Text>
                </Disclosure>
            ))}
        </div>
    )
}
