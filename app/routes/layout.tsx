import { Outlet } from 'react-router'
import { Footer } from '~/components/layout/footer'
import { Navbar } from '~/components/layout/navbar'
import { MAIN_CONTENT_ID } from '~/data/layout/landmarks'

export default function PublicLayout() {
    return (
        <div className='flex min-h-screen flex-col overflow-x-clip'>
            <Navbar />
            <main
                id={MAIN_CONTENT_ID}
                className='flex-1'>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
