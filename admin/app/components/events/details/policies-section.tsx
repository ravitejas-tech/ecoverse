import { Panel } from '~/components/ui/panel'
import { TextField } from '~/components/ui/text-field'
import { EVENT_FIELDS as fields, EVENT_SECTIONS } from '~/data/events/form'
import type { EventFormValues } from '~/schemas/event'

export function PoliciesSection() {
    return (
        <Panel title={EVENT_SECTIONS.policies.title}>
            <TextField<EventFormValues>
                name='terms'
                label={fields.terms.label}
                multiline
                rows={4}
            />
            <TextField<EventFormValues>
                name='refund_policy'
                label={fields.refund_policy.label}
                multiline
                rows={4}
            />
        </Panel>
    )
}
