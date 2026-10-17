import { Outlet } from 'react-router'
import { AppShell } from '~/components/layout/app-shell'
import { requireStaff } from '~/lib/guards'

export async function clientLoader() {
    return { staff: await requireStaff() }
}

export default function SignedInLayout() {
    return (
        <AppShell>
            <Outlet />
        </AppShell>
    )
}
