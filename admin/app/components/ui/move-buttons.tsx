import { ArrowDown, ArrowUp } from 'lucide-react'
import { Button, type ButtonProps } from '~/components/ui/button'
import { LIST_EDITOR_COPY } from '~/data/ui/list-editor'

const MOVES = [
    { icon: ArrowUp, label: LIST_EDITOR_COPY.moveUp, offset: -1 },
    { icon: ArrowDown, label: LIST_EDITOR_COPY.moveDown, offset: 1 },
] as const

export interface MoveButtonsProps {
    itemLabel: string
    index: number
    count: number
    onMove: (from: number, to: number) => void
    size?: Extract<ButtonProps['size'], 'icon' | 'icon-sm'>
    disabled?: boolean
}

export function MoveButtons({ itemLabel, index, count, onMove, size = 'icon-sm', disabled }: MoveButtonsProps) {
    return MOVES.map(({ icon: Icon, label, offset }) => (
        <Button
            key={label}
            type='button'
            variant='ghost'
            size={size}
            aria-label={`${label}: ${itemLabel}`}
            title={label}
            disabled={disabled || index + offset < 0 || index + offset >= count}
            onClick={() => onMove(index, index + offset)}>
            <Icon />
        </Button>
    ))
}
