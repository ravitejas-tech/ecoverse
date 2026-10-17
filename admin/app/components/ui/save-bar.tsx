import { Button } from '~/components/ui/button'
import { PopCard } from '~/components/ui/pop-card'
import { Text } from '~/components/ui/text'
import { cn } from '~/lib/utils'

export interface SaveBarProps {
    formId: string
    dirty: boolean
    pending: boolean
    onDiscard: () => void
    copy: { dirty: string; clean: string; save: string; saving: string; discard: string }
}

export function SaveBar({ formId, dirty, pending, onDiscard, copy }: SaveBarProps) {
    return (
        <div className={cn('mt-6', dirty && 'sticky bottom-3 z-20')}>
            <PopCard
                className={cn(
                    'flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between sm:pl-5',
                    dirty && 'shadow-pop',
                )}>
                <Text
                    variant='label'
                    tone={dirty ? 'primary' : 'muted'}
                    role='status'>
                    {dirty ? copy.dirty : copy.clean}
                </Text>
                <div className='grid grid-cols-2 gap-3 sm:flex'>
                    <Button
                        type='button'
                        variant='secondary'
                        disabled={!dirty || pending}
                        onClick={onDiscard}>
                        {copy.discard}
                    </Button>
                    <Button
                        type='submit'
                        form={formId}
                        disabled={!dirty || pending}>
                        {pending ? copy.saving : copy.save}
                    </Button>
                </div>
            </PopCard>
        </div>
    )
}
