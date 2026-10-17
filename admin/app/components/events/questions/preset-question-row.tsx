import { useFormContext, useWatch } from 'react-hook-form'
import { Checkbox } from '~/components/ui/checkbox'
import { Switch } from '~/components/ui/switch'
import { TextField } from '~/components/ui/text-field'
import { QUESTIONS_COPY } from '~/data/events/questions'
import type { PresetQuestion, QuestionsFormValues } from '~/types/questions'

export function PresetQuestionRow({ index, preset }: { index: number; preset: PresetQuestion }) {
    const { register } = useFormContext<QuestionsFormValues>()
    const enabled = useWatch<QuestionsFormValues, `presets.${number}.enabled`>({ name: `presets.${index}.enabled` })

    return (
        <li className='space-y-3'>
            <Switch
                id={`preset-${preset.kind}`}
                label={QUESTIONS_COPY.askFor(preset.name)}
                {...register(`presets.${index}.enabled`)}
            />
            {enabled && (
                <div className='grid gap-3 border-l-2 border-border pl-4 sm:grid-cols-3 sm:items-end'>
                    <TextField<QuestionsFormValues>
                        name={`presets.${index}.label`}
                        label={QUESTIONS_COPY.labelField}
                        placeholder={preset.label}
                        className='sm:col-span-2'
                    />
                    <div className='pb-3'>
                        <Checkbox
                            id={`preset-${preset.kind}-required`}
                            label={QUESTIONS_COPY.required}
                            {...register(`presets.${index}.required`)}
                        />
                    </div>
                </div>
            )}
        </li>
    )
}
