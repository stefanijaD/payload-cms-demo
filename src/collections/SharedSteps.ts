import type { CollectionConfig } from 'payload'

export const SharedSteps: CollectionConfig = {
    slug: 'shared-steps',
    labels: {
        singular: 'Shared Step',
        plural: 'Shared Steps',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'internalName',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                description: 'Internal name used only in Payload to identify this reusable step.',
            },
        },
        {
            name: 'usageType',
            type: 'select',
            required: true,
            defaultValue: 'both',
            options: [
                { label: 'Base instruction', value: 'base' },
                { label: 'Detailed instruction', value: 'detailed' },
                { label: 'Both', value: 'both' },
            ],
        },
        {
            name: 'name',
            type: 'text',
            localized: true,
            admin: {
                description: 'Optional visible step title/name.',
            },
        },
        {
            name: 'description',
            type: 'textarea',
            required: true,
            localized: true,
        },
        {
            name: 'mediaTranslatable',
            type: 'checkbox',
            defaultValue: false,
            label: 'Use locale-specific media',
            admin: {
                description: 'Enable to set a different image/video per locale.',
            },
        },
        {
            name: 'media',
            type: 'upload',
            relationTo: 'media',
            admin: {
                description: 'Optional image, GIF, or video (same for all locales).',
                condition: (data) => !data?.mediaTranslatable,
            },
        },
        {
            name: 'mediaLocalized',
            type: 'upload',
            relationTo: 'media',
            localized: true,
            admin: {
                description: 'Optional image, GIF, or video — set per locale.',
                condition: (data) => !!data?.mediaTranslatable,
            },
        },
    ],
}