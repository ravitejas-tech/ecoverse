import type { ReactNode } from 'react'
import { Container } from '~/components/ui/container'

export interface EventLayoutProps {
    main: ReactNode
    aside: ReactNode
    asideOnPhones: boolean
}

export function EventLayout({ main, aside, asideOnPhones }: EventLayoutProps) {
    return (
        <Container className='grid gap-12 pt-6 pb-16 md:pt-10 md:pb-24 lg:grid-cols-3'>
            <div className='space-y-12 lg:col-span-2'>{main}</div>
            <aside className={asideOnPhones ? undefined : 'hidden lg:block'}>
                <div className='lg:sticky lg:top-24'>{aside}</div>
            </aside>
        </Container>
    )
}
