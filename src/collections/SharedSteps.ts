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
            name: 'media',
            type: 'upload',
            relationTo: 'media',
            admin: {
                description: 'Optional image, GIF, or video.',
            },
        },
    ],
}