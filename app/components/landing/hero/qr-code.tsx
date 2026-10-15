import { QR_PATTERN } from '~/data/landing/ticket'

const SIZE = QR_PATTERN.length

export function QrCode() {
    return (
        <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className='size-20 fill-current text-on-pop sm:size-28'
            shapeRendering='crispEdges'
            aria-hidden>
            {QR_PATTERN.flatMap((row, y) =>
                [...row].map((cell, x) =>
                    cell === '1' ? (
                        <rect
                            key={`${x}-${y}`}
                            x={x}
                            y={y}
                            width='1'
                            height='1'
                        />
                    ) : null,
                ),
            )}
        </svg>
    )
}
