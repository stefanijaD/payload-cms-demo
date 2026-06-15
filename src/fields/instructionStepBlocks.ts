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
                    condition: (_, siblingData) => !siblingData?.mediaTranslatable,
                },
            },
            {
                name: 'mediaLocalized',
                type: 'upload',
                relationTo: 'media',
                localized: true,
                admin: {
                    description: 'Optional image, GIF, or video — set per locale.',
                    condition: (_, siblingData) => !!siblingData?.mediaTranslatable,
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