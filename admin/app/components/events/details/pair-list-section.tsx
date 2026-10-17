import { PairListField, type PairListFieldProps } from '~/components/events/details/pair-list-field'
import { Panel } from '~/components/ui/panel'

export function PairListSection(props: PairListFieldProps) {
    return (
        <Panel title={props.copy.title}>
            <PairListField {...props} />
        </Panel>
    )
}
