import type { ReactNode } from 'react'
import { Brand } from '~/components/layout/brand'
import { Notice } from '~/components/ui/notice'
import { PopCard } from '~/components/ui/pop-card'
import { Text } from '~/components/ui/text'

export interface AuthCardProps {
    title: string
    lead: string
    notice?: string
    children: ReactNode
}

export function AuthCard({ title, lead, notice, children }: AuthCardProps) {
    return (
        <main className='flex min-h-screen items-center justify-center bg-party-dots px-4 py-10'>
            <div className='w-full max-w-md space-y-6'>
                <Brand />
                <PopCard
                    padding='md'
                    className='space-y-6 shadow-pop'>
                    <div className='space-y-2'>
                        <Text
                            as='h1'
                            variant='display'>
                            {title}
                        </Text>
                        <Text tone='secondary'>{lead}</Text>
                    </div>
                    {notice && <Notice>{notice}</Notice>}
                    {children}
                </PopCard>
            </div>
        </main>
    )
}
