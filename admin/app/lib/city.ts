import { CITY_PRESETS } from '~/data/events/cities'

export function findCity(name: string) {
    const wanted = name.trim().toLowerCase()
    return CITY_PRESETS.find((city) => city.name.toLowerCase() === wanted)
}

export function suggestCityCode(name: string) {
    return (
        findCity(name)?.code ??
        name
            .replace(/[^a-z]/gi, '')
            .slice(0, 3)
            .toUpperCase()
    )
}
