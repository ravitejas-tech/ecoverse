export const GALLERY_COPY = {
    title: 'Gallery',
    description: 'Photos from past events. They show on the event page on the website.',
    eventLabel: 'Event',
    upload: 'Add photos',
    uploading: 'Adding photos',
    uploadStatus: { waiting: 'Waiting', uploading: 'Uploading…', done: 'Done', failed: 'Failed' },
    added: 'Photo added',
    uploadFailed: (name: string) => `Couldn't add ${name}. Try a JPG or PNG under 5 MB.`,
    defaultAlt: (event: string) => `Photo from ${event}`,
    noAlt: 'No description yet',
    count: (count: number) => `${count} ${count === 1 ? 'photo' : 'photos'}`,
    actions: {
        earlier: 'Move earlier',
        later: 'Move later',
        edit: 'Edit description',
        delete: 'Delete photo',
    },
    altDialog: {
        title: 'Describe this photo',
        description: 'A short line about what is in the photo. Screen readers and Google read it.',
        label: 'Description',
        save: 'Save',
        saved: 'Description saved',
        error: 'Write a short description',
    },
    deleteDialog: {
        title: 'Delete this photo?',
        description: 'It disappears from the website right away.',
        confirm: 'Delete photo',
        done: 'Photo deleted',
    },
    moved: 'Order saved',
    errors: { generic: 'Something went wrong. Try again.' },
    empty: { emoji: '📸', title: 'No photos yet', body: 'Add a few photos from this event.' },
    noEvents: { emoji: '🗓️', title: 'No events yet', body: 'Create an event first, then add its photos here.' },
} as const

export const GALLERY_EVENT_PARAM = 'event'

export const GALLERY_UPLOAD_KEY = ['gallery-upload']

export const PHOTO_ACCEPT = 'image/jpeg,image/png,image/webp'

export const ALT_MAX_LENGTH = 200
