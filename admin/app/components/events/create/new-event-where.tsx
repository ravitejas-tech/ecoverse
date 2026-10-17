import { useFormContext } from 'react-hook-form'
import { CityOptions } from '~/components/events/city-options'
import { VenuePicker } from '~/components/events/venue/venue-picker'
import { Panel } from '~/components/ui/panel'
import { TextField } from '~/components/ui/text-field'
import { CITY_LIST_ID } from '~/data/events/cities'
import { NEW_EVENT_COPY } from '~/data/events/copy'
import { EVENT_FIELDS } from '~/data/events/form'
import { suggestCityCode } from '~/lib/city'
import type { NewEventValues } from '~/schemas/event-create'

export function NewEventWhere() {
    const {
        setValue,
        formState: { dirtyFields },
    } = useFormContext<NewEventValues>()

    return (
        <Panel title={NEW_EVENT_COPY.sections.where}>
            <div className='grid gap-4 sm:grid-cols-3'>
                <TextField<NewEventValues>
                    name='city'
                    label={EVENT_FIELDS.city.label}
                    placeholder={EVENT_FIELDS.city.placeholder}
                    list={CITY_LIST_ID}
                    autoComplete='off'
                    required
                    className='sm:col-span-2'
                    onValueChange={(city) => {
                        if (!dirtyFields.city_code) setValue('city_code', suggestCityCode(city))
                    }}
                />
                <TextField<NewEventValues>
                    name='city_code'
                    label={EVENT_FIELDS.city_code.label}
                    hint={EVENT_FIELDS.city_code.hint}
                    maxLength={3}
                    autoCapitalize='characters'
                    required
                />
            </div>
            <CityOptions />
            <VenuePicker />
            <TextField<NewEventValues>
                name='venue_name'
                label={EVENT_FIELDS.venue_name.label}
                placeholder={EVENT_FIELDS.venue_name.placeholder}
                required
            />
            <TextField<NewEventValues>
                name='venue_address'
                label={EVENT_FIELDS.venue_address.label}
                placeholder={EVENT_FIELDS.venue_address.placeholder}
            />
        </Panel>
    )
}
