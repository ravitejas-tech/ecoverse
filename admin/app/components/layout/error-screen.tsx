import { Link } from 'react-router'
import { Button } from '~/components/ui/button'
import { PopCard } from '~/components/ui/pop-card'
import { Text } from '~/components/ui/text'
import { AUTH_PATHS } from '~/data/auth/session'
import { ERROR_COPY } from '~/data/ui/feedback'

export interface ErrorScreenProps {
    title: string
    details: string
    stack?: string | undefined
}

export function ErrorScreen({ title, details, stack }: ErrorScreenProps) {
    return (
        <main className='mx-auto flex min-h-screen max-w-2xl flex-col items-start justify-center gap-5 px-4 py-16'>
            <Text
                as='h1'
                variant='display'>
                {title}
            </Text>
            <Text tone='secondary'>{details}</Text>
            <Button asChild>
                <Link to={AUTH_PATHS.home}>{ERROR_COPY.home}</Link>
            </Button>
            {stack && (
                <PopCard
                    asChild
                    className='w-full overflow-x-auto p-4'>
                    <pre>
                        <Text
                            as='small'
                            variant='code'
                            tone='muted'>
                            {stack}
                        </Text>
                    </pre>
                </PopCard>
            )}
        </main>
    )
}
