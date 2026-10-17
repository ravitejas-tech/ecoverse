import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { CustomQuestions } from '~/components/events/questions/custom-questions'
import { PresetQuestionRow } from '~/components/events/questions/preset-question-row'
import { QuestionsPreview } from '~/components/events/questions/questions-preview'
import { Notice } from '~/components/ui/notice'
import { Panel } from '~/components/ui/panel'
import { SaveBar } from '~/components/ui/save-bar'
import { Text } from '~/components/ui/text'
import { UnsavedChangesGuard } from '~/components/ui/unsaved-changes-guard'
import { SAVE_BAR_COPY } from '~/data/events/form'
import { PRESET_QUESTIONS, QUESTIONS_COPY, QUESTIONS_FORM_ID } from '~/data/events/questions'
import { useUpdateEvent } from '~/hooks/events/mutations'
import { useCan } from '~/hooks/staff/use-can'
import { formToQuestions, questionsToForm } from '~/lib/events/questions'
import { eventQuestionsSchema, questionsFormSchema } from '~/schemas/event-questions'
import type { EventRow } from '~/types/events'
import type { QuestionsFormValues } from '~/types/questions'

const formOf = (event: EventRow) => questionsToForm(eventQuestionsSchema.parse(event.questions))

export function QuestionsEditor({ event }: { event: EventRow }) {
    const canEdit = useCan('editEvents')
    const { mutate, isPending } = useUpdateEvent()
    const form = useForm<QuestionsFormValues>({
        resolver: zodResolver(questionsFormSchema),
        defaultValues: formOf(event),
    })
    const { isDirty } = form.formState

    return (
        <FormProvider {...form}>
            <div className='grid gap-6 lg:grid-cols-5 lg:items-start'>
                <form
                    id={QUESTIONS_FORM_ID}
                    noValidate
                    className='lg:col-span-3'
                    onSubmit={form.handleSubmit((values) =>
                        mutate(
                            { id: event.id, patch: { questions: formToQuestions(values) }, notice: 'questionsSaved' },
                            { onSuccess: (saved) => form.reset(formOf(saved)) },
                        ),
                    )}>
                    <fieldset
                        disabled={!canEdit}
                        className='min-w-0 space-y-6'>
                        {!canEdit && <Notice tone='cyan'>{SAVE_BAR_COPY.readOnly}</Notice>}
                        <Panel title={QUESTIONS_COPY.presetsTitle}>
                            <Text
                                variant='small'
                                tone='secondary'>
                                {QUESTIONS_COPY.presetsLead}
                            </Text>
                            <ul className='space-y-3'>
                                {PRESET_QUESTIONS.map((preset, index) => (
                                    <PresetQuestionRow
                                        key={preset.kind}
                                        index={index}
                                        preset={preset}
                                    />
                                ))}
                            </ul>
                        </Panel>
                        <CustomQuestions readOnly={!canEdit} />
                    </fieldset>
                </form>
                <div className='lg:sticky lg:top-6 lg:col-span-2'>
                    <QuestionsPreview />
                </div>
            </div>
            {canEdit && (
                <SaveBar
                    formId={QUESTIONS_FORM_ID}
                    dirty={isDirty}
                    pending={isPending}
                    onDiscard={() => form.reset()}
                    copy={{ ...SAVE_BAR_COPY, save: QUESTIONS_COPY.save }}
                />
            )}
            <UnsavedChangesGuard dirty={isDirty && !isPending} />
        </FormProvider>
    )
}
