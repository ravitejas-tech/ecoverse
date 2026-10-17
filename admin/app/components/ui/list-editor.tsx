import type { ReactNode } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { InsetCard } from '~/components/ui/inset-card'
import { MoveButtons } from '~/components/ui/move-buttons'
import { Text } from '~/components/ui/text'
import { LIST_EDITOR_COPY } from '~/data/ui/list-editor'

export interface ListEditorProps {
    keys: readonly string[]
    addLabel: string
    emptyLabel: string
    itemLabel: (index: number) => string
    onAdd: () => void
    onRemove: (index: number) => void
    onMove: (from: number, to: number) => void
    renderItem: (index: number) => ReactNode
    readOnly?: boolean
}

export function ListEditor({
    keys,
    addLabel,
    emptyLabel,
    itemLabel,
    onAdd,
    onRemove,
    onMove,
    renderItem,
    readOnly = false,
}: ListEditorProps) {
    return (
        <div className='space-y-3'>
            {keys.length === 0 && (
                <Text
                    variant='small'
                    tone='muted'>
                    {emptyLabel}
                </Text>
            )}
            <ol className='space-y-3'>
                {keys.map((key, index) => (
                    <InsetCard
                        key={key}
                        className='flex flex-col gap-3 sm:flex-row sm:items-start'>
                        <div className='min-w-0 flex-1'>{renderItem(index)}</div>
                        {!readOnly && (
                            <div className='flex shrink-0 justify-end gap-1 sm:flex-col'>
                                <MoveButtons
                                    itemLabel={itemLabel(index)}
                                    index={index}
                                    count={keys.length}
                                    onMove={onMove}
                                />
                                <Button
                                    type='button'
                                    variant='ghost'
                                    size='icon-sm'
                                    aria-label={`${LIST_EDITOR_COPY.remove}: ${itemLabel(index)}`}
                                    title={LIST_EDITOR_COPY.remove}
                                    onClick={() => onRemove(index)}>
                                    <Trash2 />
                                </Button>
                            </div>
                        )}
                    </InsetCard>
                ))}
            </ol>
            {!readOnly && (
                <Button
                    type='button'
                    variant='secondary'
                    size='sm'
                    onClick={onAdd}>
                    <Plus />
                    {addLabel}
                </Button>
            )}
        </div>
    )
}
