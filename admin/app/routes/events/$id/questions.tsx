import { QuestionsEditor } from '~/components/events/questions/questions-editor'
import { useEventOutlet } from '~/hooks/events/use-event-outlet'
import { requirePermission } from '~/lib/guards'

export async function clientLoader() {
    await requirePermission('viewEvents')
    return null
}

export default function EventQuestions() {
    const { event } = useEventOutlet()

    return (
        <QuestionsEditor
            key={event.id}
            event={event}
        />
    )
}
