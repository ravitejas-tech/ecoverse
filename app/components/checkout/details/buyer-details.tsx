import { BuyerField } from '~/components/checkout/details/buyer-field'
import { ConsentFields } from '~/components/checkout/details/consent-fields'
import { QuestionField } from '~/components/checkout/details/question-field'
import { Text } from '~/components/ui/text'
import { BUYER_FIELDS, FORM_COPY } from '~/data/checkout/form'
import type { EventQuestion } from '~/types/checkout'

export interface BuyerDetailsProps {
    questions: EventQuestion[]
}

export function BuyerDetails({ questions }: BuyerDetailsProps) {
    return (
        <div className='space-y-5'>
            <Text
                variant='small'
                tone='muted'>
                {FORM_COPY.requiredLegend}
            </Text>
            {BUYER_FIELDS.map((field) => (
                <BuyerField
                    key={field.name}
                    field={field}
                />
            ))}
            {questions.map((question) => (
                <QuestionField
                    key={question.id}
                    question={question}
                />
            ))}
            <ConsentFields />
        </div>
    )
}
