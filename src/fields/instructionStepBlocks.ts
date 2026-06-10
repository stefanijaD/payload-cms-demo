import type { Field } from 'payload'

export const instructionStepBlocks: Field[] = [
    {
        name: 'source',
        type: 'select',
        required: true,
        defaultValue: 'inline',
        options: [
            { label: 'Inline Step', value: 'inline' },
            { label: 'Shared Step', value: 'sharedStep' },
            { label: 'Shared Step Group', value: 'sharedStepGroup' },
        ],
    },
    {
        name: 'inline',
        type: 'group',
        admin: {
            condition: (_, siblingData) => siblingData?.source === 'inline',
        },
        fields: [
            {
                name: 'name',
                type: 'text',
                localized: true,
                admin: {
                    description: 'Optional step title/name.',
                },
            },
            {
                name: 'description',
                type: 'textarea',
                localized: true,
                required: true,
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
    },
    {
        name: 'sharedStep',
        type: 'relationship',
        relationTo: 'shared-steps',
        required: true,
        admin: {
            condition: (_, siblingData) => siblingData?.source === 'sharedStep',
        },
    },
    {
        name: 'sharedStepGroup',
        type: 'relationship',
        relationTo: 'shared-step-groups',
        required: true,
        admin: {
            condition: (_, siblingData) => siblingData?.source === 'sharedStepGroup',
        },
    },
]