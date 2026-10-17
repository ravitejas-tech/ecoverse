import { useFieldArray } from 'react-hook-form'
import { ListEditor } from '~/components/ui/list-editor'
import { TextField } from '~/components/ui/text-field'
import { itemLabel } from '~/data/events/form'
import type { EventFormValues } from '~/schemas/event'
import type { TextListName } from '~/types/events'

export interface TextListFieldProps {
    name: TextListName
    copy: { item: string; add: string; empty: string; placeholder: string }
    readOnly: boolean
}

export function TextListField({ name, copy, readOnly }: TextListFieldProps) {
    const { fields, append, remove, move } = useFieldArray<EventFormValues, TextListName>({ name })
    const labelOf = (index: number) => itemLabel(copy.item, index)

    return (
        <ListEditor
            keys={fields.map(({ id }) => id)}
            addLabel={copy.add}
            emptyLabel={copy.empty}
            itemLabel={labelOf}
            onAdd={() => append({ value: '' })}
            onRemove={remove}
            onMove={move}
            readOnly={readOnly}
            renderItem={(index) => (
                <TextField
                    name={`${name}.${index}.value`}
                    label={labelOf(index)}
                    placeholder={copy.placeholder}
                />
            )}
        />
    )
}
