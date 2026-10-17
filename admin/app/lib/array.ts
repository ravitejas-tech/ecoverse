export function moveItem<Item>(items: readonly Item[], from: number, to: number) {
    const next = [...items]
    const [moved] = next.splice(from, 1)
    if (moved === undefined) return next
    next.splice(to, 0, moved)
    return next
}
