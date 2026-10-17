import { TextListField } from '~/components/events/details/text-list-field'
import { Panel } from '~/components/ui/panel'
import { TextField } from '~/components/ui/text-field'
import { EVENT_FIELDS as fields, EVENT_SECTIONS } from '~/data/events/form'
import type { EventFormValues } from '~/schemas/event'

export function AboutSection({ readOnly }: { readOnly: boolean }) {
    return (
        <>
            <Panel title={EVENT_SECTIONS.about.title}>
                <TextField<EventFormValues>
                    name='description'
                    label={fields.description.label}
                    hint={fields.description.hint}
                    multiline
                    rows={8}
                />
            </Panel>
            <Panel title={EVENT_SECTIONS.highlights.title}>
                <TextListField
                    name='highlights'
                    copy={EVENT_SECTIONS.highlights}
                    readOnly={readOnly}
                />
            </Panel>
        </>
    )
}
