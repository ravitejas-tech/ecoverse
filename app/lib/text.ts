export function truncate(text: string, limit: number) {
    if (text.length <= limit) return text
    const cut = text.slice(0, limit - 1)
    const lastSpace = cut.lastIndexOf(' ')
    return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:·—-]+$/, '')}…`
}
