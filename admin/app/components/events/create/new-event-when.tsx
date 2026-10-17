import { Panel } from '~/components/ui/panel'
import { TextField } from '~/components/ui/text-field'
import { NEW_EVENT_COPY } from '~/data/events/copy'
import { EVENT_FIELDS } from '~/data/events/form'
import type { NewEventValues } from '~/schemas/event-create'

export function NewEventWhen() {
    return (
        <Panel title={NEW_EVENT_COPY.sections.when}>
            <div className='grid gap-4 sm:grid-cols-3'>
                <TextField<NewEventValues>
                    name='date'
                    type='date'
                    label={EVENT_FIELDS.date.label}
                    required
                />
                <TextField<NewEventValues>
                    name='start_time'
                    type='time'
                    label={EVENT_FIELDS.start_time.label}
                    required
                />
                <TextField<NewEventValues>
                    name='end_time'
                    type='time'
                    label={EVENT_FIELDS.end_time.label}
                    hint={EVENT_FIELDS.end_time.hint}
                    required
                />
            </div>
        </Panel>
    )
}
