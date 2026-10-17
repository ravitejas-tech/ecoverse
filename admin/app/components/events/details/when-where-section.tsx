import { CityOptions } from '~/components/events/city-options'
import { VenuePicker } from '~/components/events/venue/venue-picker'
import { Panel } from '~/components/ui/panel'
import { TextField } from '~/components/ui/text-field'
import { CITY_LIST_ID } from '~/data/events/cities'
import { EVENT_FIELDS as fields, EVENT_SECTIONS } from '~/data/events/form'
import type { EventFormValues } from '~/schemas/event'

export function WhenWhereSection({ readOnly }: { readOnly: boolean }) {
    return (
        <Panel title={EVENT_SECTIONS.when.title}>
            <div className='grid gap-4 sm:grid-cols-2'>
                <TextField<EventFormValues>
                    name='starts_at'
                    type='datetime-local'
                    label={fields.starts_at.label}
                    hint={fields.starts_at.hint}
                    required
                />
                <TextField<EventFormValues>
                    name='ends_at'
                    type='datetime-local'
                    label={fields.ends_at.label}
                    hint={fields.ends_at.hint}
                    required
                />
            </div>
            <div className='grid gap-4 sm:grid-cols-3'>
                <TextField<EventFormValues>
                    name='city'
                    label={fields.city.label}
                    list={CITY_LIST_ID}
                    autoComplete='off'
                    required
                />
                <TextField<EventFormValues>
                    name='city_code'
                    label={fields.city_code.label}
                    hint={fields.city_code.hint}
                    maxLength={3}
                    autoCapitalize='characters'
                    required
                />
                <TextField<EventFormValues>
                    name='region'
                    label={fields.region.label}
                    placeholder={fields.region.placeholder}
                    required
                />
            </div>
            <CityOptions />
            <VenuePicker readOnly={readOnly} />
            <TextField<EventFormValues>
                name='venue_name'
                label={fields.venue_name.label}
                placeholder={fields.venue_name.placeholder}
            />
            <TextField<EventFormValues>
                name='venue_address'
                label={fields.venue_address.label}
                placeholder={fields.venue_address.placeholder}
            />
        </Panel>
    )
}
