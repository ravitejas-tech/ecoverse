export function toSearchPattern(text: string) {
    const clean = text.replace(/[%_,()*"\\]/g, ' ').trim()
    return clean ? `"%${clean}%"` : null
}

export function searchAcross(columns: readonly string[], text: string) {
    const pattern = toSearchPattern(text)
    return pattern ? columns.map((column) => `${column}.ilike.${pattern}`).join(',') : null
}
