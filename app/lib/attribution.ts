import { ATTRIBUTION_STORAGE_KEY, UTM_PARAMS, VISITOR_STORAGE_KEY } from '~/data/ui/attribution'
import type { Attribution } from '~/types/attribution'

function readStorage(storage: Storage, key: string) {
    try {
        return storage.getItem(key)
    } catch {
        return null
    }
}

function writeStorage(storage: Storage, key: string, value: string) {
    try {
        storage.setItem(key, value)
    } catch {
        return
    }
}

export function captureAttribution(search: string) {
    const params = new URLSearchParams(search)
    const fromUrl = Object.fromEntries(
        Object.entries(UTM_PARAMS)
            .map(([field, param]) => [field, params.get(param)?.slice(0, 100)])
            .filter(([, value]) => value),
    ) as Attribution
    const referrer = document.referrer && !document.referrer.startsWith(location.origin) ? document.referrer : undefined

    if (Object.keys(fromUrl).length === 0 && readStorage(sessionStorage, ATTRIBUTION_STORAGE_KEY)) return
    writeStorage(sessionStorage, ATTRIBUTION_STORAGE_KEY, JSON.stringify({ ...fromUrl, referrer }))
}

export function readAttribution(): Attribution {
    try {
        return JSON.parse(readStorage(sessionStorage, ATTRIBUTION_STORAGE_KEY) ?? '{}') as Attribution
    } catch {
        return {}
    }
}

export function visitorId() {
    const existing = readStorage(localStorage, VISITOR_STORAGE_KEY)
    if (existing) return existing
    const created = crypto.randomUUID()
    writeStorage(localStorage, VISITOR_STORAGE_KEY, created)
    return created
}
