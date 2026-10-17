import { useFieldArray } from 'react-hook-form'
import { ListEditor } from '~/components/ui/list-editor'
import { TextField } from '~/components/ui/text-field'
import { EMPTY_LIST_ITEMS, itemLabel } from '~/data/events/form'
import type { EventFormValues } from '~/schemas/event'
import { cn } from '~/lib/utils'
import type { ListItemField, PairListName } from '~/types/events'

export interface PairListFieldProps {
    name: PairListName
    fields: readonly ListItemField[]
    copy: { title: string; item: string; add: string; empty: string }
    stacked?: boolean
    readOnly: boolean
}

export function PairListField({ name, fields: itemFields, copy, stacked = false, readOnly }: PairListFieldProps) {
    const { fields, append, remove, move } = useFieldArray<EventFormValues, PairListName>({ name })

    return (
        <ListEditor
            keys={fields.map(({ id }) => id)}
            addLabel={copy.add}
            emptyLabel={copy.empty}
            itemLabel={(index) => itemLabel(copy.item, index)}
            onAdd={() => append({ ...EMPTY_LIST_ITEMS[name] })}
            onRemove={remove}
            onMove={move}
            readOnly={readOnly}
            renderItem={(index) => (
                <div className={cn('grid gap-3', !stacked && 'sm:grid-cols-3')}>
                    {itemFields.map(({ key, label, placeholder, multiline }, position) => (
                        <TextField
                            key={key}
                            name={`${name}.${index}.${key}`}
                            label={label}
                            placeholder={placeholder}
                            multiline={multiline}
                            rows={3}
                            className={cn(!stacked && position > 0 && 'sm:col-span-2')}
                        />
                    ))}
                </div>
            )}
        />
    )
}
