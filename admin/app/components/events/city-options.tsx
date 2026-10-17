import { CITY_LIST_ID, CITY_PRESETS } from '~/data/events/cities'

export function CityOptions() {
    return (
        <datalist id={CITY_LIST_ID}>
            {CITY_PRESETS.map(({ name }) => (
                <option
                    key={name}
                    value={name}
                />
            ))}
        </datalist>
    )
}
