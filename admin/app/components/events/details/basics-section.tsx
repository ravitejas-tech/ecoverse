import { Controller, useFormContext } from 'react-hook-form'
import { Panel } from '~/components/ui/panel'
import { SelectField } from '~/components/ui/select-field'
import { SwatchPicker } from '~/components/ui/swatch-picker'
import { TextField } from '~/components/ui/text-field'
import { EVENT_FIELDS as fields, EVENT_SECTIONS } from '~/data/events/form'
import { CATEGORY_OPTIONS, TONE_OPTIONS } from '~/data/events/labels'
import type { EventFormValues } from '~/schemas/event'

export function BasicsSection() {
    const { control } = useFormContext<EventFormValues>()

    return (
        <Panel title={EVENT_SECTIONS.basics.title}>
            <TextField<EventFormValues>
                name='title'
                label={fields.title.label}
                placeholder={fields.title.placeholder}
                required
            />
            <TextField<EventFormValues>
                name='slug'
                label={fields.slug.label}
                hint={fields.slug.hint}
                autoCapitalize='none'
                spellCheck={false}
                required
            />
            <div className='grid gap-4 sm:grid-cols-2'>
                <SelectField<EventFormValues>
                    name='category'
                    label={fields.category.label}
                    options={CATEGORY_OPTIONS}
                />
                <TextField<EventFormValues>
                    name='tag'
                    label={fields.tag.label}
                    hint={fields.tag.hint}
                />
            </div>
            <Controller
                control={control}
                name='tone'
                render={({ field }) => (
                    <SwatchPicker
                        name={field.name}
                        label={fields.tone.label}
                        value={field.value}
                        options={TONE_OPTIONS}
                        onChange={field.onChange}
                    />
                )}
            />
            <TextField<EventFormValues>
                name='summary'
                label={fields.summary.label}
                hint={fields.summary.hint}
                multiline
                rows={2}
                required
            />
        </Panel>
    )
}
