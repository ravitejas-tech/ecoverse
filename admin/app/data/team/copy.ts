export const TEAM_COPY = {
    title: 'Team',
    description: 'Who can use the admin, and what each person can do.',
    invite: 'Invite someone',
    caption: 'Team members',
    you: 'You',
    columns: { name: 'Name', email: 'Email', role: 'Role', status: 'Status', actions: 'Manage' },
    status: { active: 'Active', inactive: 'Deactivated' },
    actions: { role: 'Change role', deactivate: 'Deactivate', reactivate: 'Reactivate' },
    selfNote: "You can't change your own access.",
    inviteDialog: {
        title: 'Invite someone',
        description: 'They get an email with a link to set their password.',
        name: 'Name',
        email: 'Email',
        role: 'Role',
        submit: 'Send invite',
        sent: (email: string) => `Invite sent to ${email}`,
    },
    roleDialog: {
        title: (name: string) => `Change ${name}'s role`,
        description: 'This changes what they can see and do, right away.',
        role: 'New role',
        submit: 'Save role',
        saved: 'Role changed',
    },
    deactivateDialog: {
        title: (name: string) => `Deactivate ${name}?`,
        description: "They won't be able to sign in until you reactivate them.",
        confirm: 'Deactivate',
        done: 'Deactivated',
    },
    reactivated: 'Reactivated',
    errors: {
        name: 'Enter their name',
        email: 'Enter a valid email address',
        generic: 'Something went wrong. Try again.',
    },
    empty: { emoji: '👥', title: 'No one here yet', body: 'Invite your first team member.' },
} as const

export const DEFAULT_INVITE_ROLE = 'viewer'
