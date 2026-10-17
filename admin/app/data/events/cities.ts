import type { CityPreset } from '~/types/events'

export const CITY_PRESETS: readonly CityPreset[] = [
    { name: 'Pune', code: 'PUN', region: 'Maharashtra' },
    { name: 'Mumbai', code: 'BOM', region: 'Maharashtra' },
    { name: 'Bengaluru', code: 'BLR', region: 'Karnataka' },
    { name: 'Delhi', code: 'DEL', region: 'Delhi' },
    { name: 'Hyderabad', code: 'HYD', region: 'Telangana' },
    { name: 'Goa', code: 'GOI', region: 'Goa' },
    { name: 'Chennai', code: 'MAA', region: 'Tamil Nadu' },
    { name: 'Kolkata', code: 'CCU', region: 'West Bengal' },
]

export const CITY_LIST_ID = 'city-presets'
