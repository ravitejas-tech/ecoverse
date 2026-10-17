import { useFieldArray, useFormContext } from 'react-hook-form'
import { Checkbox } from '~/components/ui/checkbox'
import { ListEditor } from '~/components/ui/list-editor'
import { Panel } from '~/components/ui/panel'
import { Text } from '~/components/ui/text'
import { TextField } from '~/components/ui/text-field'
import { itemLabel } from '~/data/events/form'
import { QUESTIONS_COPY } from '~/data/events/questions'
import { newCustomQuestion } from '~/lib/events/questions'
import type { QuestionsFormValues } from '~/types/questions'

export function CustomQuestions({ readOnly }: { readOnly: boolean }) {
    const { register } = useFormContext<QuestionsFormValues>()
    const { fields, append, remove, move } = useFieldArray<QuestionsFormValues, 'custom', 'fieldKey'>({
        name: 'custom',
        keyName: 'fieldKey',
    })
    const labelOf = (index: number) => itemLabel(QUESTIONS_COPY.customLabel, index)

    return (
        <Panel title={QUESTIONS_COPY.customTitle}>
            <Text
                variant='small'
                tone='secondary'>
                {QUESTIONS_COPY.customLead}
            </Text>
            <ListEditor
                keys={fields.map(({ fieldKey }) => fieldKey)}
                addLabel={QUESTIONS_COPY.addCustom}
                emptyLabel={QUESTIONS_COPY.noCustom}
                itemLabel={labelOf}
                onAdd={() => append(newCustomQuestion())}
                onRemove={remove}
                onMove={move}
                readOnly={readOnly}
                renderItem={(index) => (
                    <div className='space-y-3'>
                        <TextField<QuestionsFormValues>
                            name={`custom.${index}.label`}
                            label={labelOf(index)}
                            placeholder={QUESTIONS_COPY.customPlaceholder}
                            required
                        />
                        <TextField<QuestionsFormValues>
                            name={`custom.${index}.choices`}
                            label={QUESTIONS_COPY.choices}
                            hint={QUESTIONS_COPY.choicesHint}
                        />
                        <Checkbox
                            id={`custom-${index}-required`}
                            label={QUESTIONS_COPY.required}
                            {...register(`custom.${index}.required`)}
                        />
                    </div>
                )}
            />
        </Panel>
    )
}
