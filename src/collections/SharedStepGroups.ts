import type { CollectionConfig } from 'payload'

export const SharedStepGroups: CollectionConfig = {
    slug: 'shared-step-groups',
    labels: {
        singular: 'Shared Step Group',
        plural: 'Shared Step Groups',
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
                description: 'Internal name used only in Payload to identify this reusable step group.',
            },
        },
        {
            name: 'description',
            type: 'textarea',
            localized: true,
            admin: {
                description: 'Optional description for editors.',
            },
        },
        {
            name: 'steps',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'step',
                    type: 'relationship',
                    relationTo: 'shared-steps',
                    required: true,
                },
            ],
        },
    ],
}