import type { Options } from 'canvas-confetti'
import { CONFETTI_BURST, CONFETTI_COLOR_VARS } from '~/data/ui/confetti'

function themeColors() {
    const styles = getComputedStyle(document.documentElement)
    return CONFETTI_COLOR_VARS.map((name) => styles.getPropertyValue(name).trim())
}

export function originOf(element: Element): Options['origin'] {
    const { left, top, width, height } = element.getBoundingClientRect()
    return { x: (left + width / 2) / innerWidth, y: (top + height / 2) / innerHeight }
}

export async function celebrate(options: Options = {}) {
    const { default: confetti } = await import('canvas-confetti')
    await confetti({ ...CONFETTI_BURST, colors: themeColors(), ...options })
}
