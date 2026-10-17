export function readCssVar(name: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}
