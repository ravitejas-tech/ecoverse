import { useState, type ReactNode } from 'react'
import { Menu, X } from 'lucide-react'
import { Brand } from '~/components/layout/brand'
import { NavLinks } from '~/components/layout/nav-links'
import { UserPanel } from '~/components/layout/user-panel'
import { Button } from '~/components/ui/button'
import { SHELL_COPY } from '~/data/layout/navigation'

export function AppShell({ children }: { children: ReactNode }) {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className='min-h-screen lg:flex'>
            <aside className='sticky top-0 hidden h-screen w-64 shrink-0 flex-col gap-6 overflow-y-auto border-r-2 border-border bg-surface p-5 lg:flex'>
                <Brand />
                <div className='flex-1'>
                    <NavLinks />
                </div>
                <UserPanel />
            </aside>
            <header className='sticky top-0 z-30 border-b-2 border-border bg-bg/90 backdrop-blur-md lg:hidden'>
                <div className='flex h-16 items-center justify-between px-4'>
                    <Brand />
                    <Button
                        variant='secondary'
                        size='icon'
                        aria-expanded={menuOpen}
                        aria-label={menuOpen ? SHELL_COPY.closeMenu : SHELL_COPY.openMenu}
                        onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X /> : <Menu />}
                    </Button>
                </div>
                {menuOpen && (
                    <div className='space-y-4 border-t-2 border-border bg-surface px-4 py-4'>
                        <NavLinks onNavigate={() => setMenuOpen(false)} />
                        <UserPanel />
                    </div>
                )}
            </header>
            <main className='min-w-0 flex-1'>
                <div className='mx-auto w-full max-w-8xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10'>{children}</div>
            </main>
        </div>
    )
}
