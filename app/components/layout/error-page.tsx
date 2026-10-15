import { Link } from 'react-router'
import { Button } from '~/components/ui/button'
import { Container } from '~/components/ui/container'
import { PopCard } from '~/components/ui/pop-card'
import { Sticker } from '~/components/ui/sticker'
import { Text } from '~/components/ui/text'
import { BRAND_NAME } from '~/data/brand'
import { ERROR_HOME_LABEL, ERROR_STICKER, ERROR_ROBOTS } from '~/data/ui/error'
import { HOME_PATH } from '~/data/navigation'

export interface ErrorPageProps {
    title: string
    details: string
    stack?: string | undefined
}

export function ErrorPage({ title, details, stack }: ErrorPageProps) {
    return (
        <Container className='flex min-h-screen flex-col items-start justify-center gap-6 py-16'>
            <title>{`${title} · ${BRAND_NAME}`}</title>
            <meta
                name='robots'
                content={ERROR_ROBOTS}
            />
            <Sticker
                tone='orange'
                tilt='left'>
                {ERROR_STICKER}
            </Sticker>
            <Text
                as='h1'
                variant='hero'>
                {title}
            </Text>
            <Text
                variant='lead'
                tone='secondary'>
                {details}
            </Text>
            <Button asChild>
                <Link to={HOME_PATH}>{ERROR_HOME_LABEL}</Link>
            </Button>
            {stack && (
                <PopCard
                    asChild
                    className='w-full overflow-x-auto p-4'>
                    <pre>
                        <Text
                            as='small'
                            variant='small'
                            tone='muted'>
                            {stack}
                        </Text>
                    </pre>
                </PopCard>
            )}
        </Container>
    )
}
