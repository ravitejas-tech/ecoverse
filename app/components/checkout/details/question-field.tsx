import { useFormContext } from 'react-hook-form'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Select } from '~/components/ui/select'
import { FORM_COPY } from '~/data/checkout/form'
import { questionFieldId } from '~/data/checkout/ids'
import { QUESTION_INPUTS } from '~/data/checkout/questions'
import { questionOptions } from '~/lib/checkout/questions'
import type { CheckoutFormInput, EventQuestion } from '~/types/checkout'

export interface QuestionFieldProps {
    question: EventQuestion
}

export function QuestionField({ question }: QuestionFieldProps) {
    const {
        register,
        formState: { errors },
    } = useFormContext<CheckoutFormInput>()
    const { control: _control, options: _options, ...inputProps } = QUESTION_INPUTS[question.kind]
    const options = questionOptions(question)

    return (
        <Field
            id={questionFieldId(question.id)}
            label={question.label}
            error={errors.answers?.[question.id]?.message}
            required={question.required}>
            {(control) =>
                options.length > 0 ? (
                    <Select
                        {...control}
                        {...register(`answers.${question.id}`)}
                        options={options}
                        placeholder={FORM_COPY.selectPlaceholder}
                        autoComplete={inputProps.autoComplete}
                    />
                ) : (
                    <Input
                        {...control}
                        {...register(`answers.${question.id}`)}
                        {...inputProps}
                        enterKeyHint='next'
                    />
                )
            }
        </Field>
    )
}
