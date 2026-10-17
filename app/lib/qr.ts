import { create } from 'qrcode'

export function qrPath(value: string, margin: number) {
    const { size, data } = create(value, { errorCorrectionLevel: 'M' }).modules
    const path = Array.from(data, (dark, index) =>
        dark ? `M${(index % size) + margin} ${Math.floor(index / size) + margin}h1v1h-1z` : '',
    ).join('')
    return { size: size + margin * 2, path }
}
