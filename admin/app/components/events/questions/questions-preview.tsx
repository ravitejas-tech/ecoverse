import { useWatch } from 'react-hook-form'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Panel } from '~/components/ui/panel'
import { Select } from '~/components/ui/select'
import { Text } from '~/components/ui/text'
import { BUYER_BASICS, QUESTIONS_COPY } from '~/data/events/questions'
import { questionOptions, questionPlaceholder } from '~/lib/events/question-options'
import { formToQuestions } from '~/lib/events/questions'
import type { QuestionsFormValues } from '~/types/questions'

export function QuestionsPreview() {
    const [presets, custom] = useWatch<QuestionsFormValues, ['presets', 'custom']>({ name: ['presets', 'custom'] })
    const questions = formToQuestions({ presets, custom })

    return (
        <Panel title={QUESTIONS_COPY.previewTitle}>
            <Text
                variant='small'
                tone='secondary'>
                {QUESTIONS_COPY.previewLead}
            </Text>
            <div
                inert
                className='space-y-4'>
                {BUYER_BASICS.map(({ id, label, placeholder }) => (
                    <Field
                        key={id}
                        label={label}
                        htmlFor={`preview-${id}`}
                        required>
                        <Input
                            id={`preview-${id}`}
                            placeholder={placeholder}
                            readOnly
                        />
                    </Field>
                ))}
                {questions.map((question) => {
                    const options = questionOptions(question)
                    const id = `preview-${question.id}`
                    return (
                        <Field
                            key={question.id}
                            label={question.label || QUESTIONS_COPY.customPlaceholder}
                            htmlFor={id}
                            required={question.required}>
                            {options.length > 0 ? (
                                <Select
                                    id={id}
                                    options={options.map((option) => ({ value: option, label: option }))}
                                    placeholder={QUESTIONS_COPY.chooseOne}
                                />
                            ) : (
                                <Input
                                    id={id}
                                    placeholder={questionPlaceholder(question)}
                                    readOnly
                                />
                            )}
                        </Field>
                    )
                })}
            </div>
        </Panel>
    )
}
