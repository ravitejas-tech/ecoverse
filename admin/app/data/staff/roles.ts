import type { StaffRole } from '~/types/staff'

export const ROLE_LABELS: Record<StaffRole, string> = {
    super_admin: 'Super Admin',
    event_manager: 'Event Manager',
    finance: 'Finance',
    marketing: 'Marketing',
    gate_staff: 'Gate Staff',
    viewer: 'Viewer',
}

export const ROLE_DESCRIPTIONS: Record<StaffRole, string> = {
    super_admin: 'Everything, including the team and the activity log',
    event_manager: 'Events, tickets, attendees, free tickets and check-in',
    finance: 'Orders, payments, refunds and reports',
    marketing: 'Promo codes, the community and numbers',
    gate_staff: 'Scanning tickets at the gate only',
    viewer: 'Read-only dashboard and lists',
}

export const PERMISSIONS = {
    viewReports: ['super_admin', 'event_manager', 'finance', 'marketing', 'viewer'],
    viewEvents: ['super_admin', 'event_manager', 'finance', 'marketing', 'viewer'],
    editEvents: ['super_admin', 'event_manager'],
    viewOrders: ['super_admin', 'event_manager', 'finance', 'marketing', 'viewer'],
    viewCommunity: ['super_admin', 'event_manager', 'finance', 'marketing', 'viewer'],
    cancelOrders: ['super_admin', 'event_manager', 'finance'],
    editOrderNotes: ['super_admin', 'event_manager', 'finance'],
    refundOrders: ['super_admin', 'finance'],
    resendTickets: ['super_admin', 'event_manager', 'finance'],
    issueComplimentary: ['super_admin', 'event_manager'],
    viewPromoCodes: ['super_admin', 'event_manager', 'finance', 'marketing', 'viewer'],
    editPromoCodes: ['super_admin', 'event_manager', 'marketing'],
    checkIn: ['super_admin', 'event_manager', 'gate_staff'],
    overrideCheckIn: ['super_admin', 'event_manager'],
    manageGallery: ['super_admin', 'event_manager'],
    manageTeam: ['super_admin'],
    viewActivity: ['super_admin'],
} as const satisfies Record<string, readonly StaffRole[]>
