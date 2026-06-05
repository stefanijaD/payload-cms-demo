import type { CollectionConfig } from 'payload'

export const Instructions: CollectionConfig = {
  slug: 'instructions',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'phoneModel',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      localized: true,
    },
    {
      name: 'steps',
      type: 'array',
      fields: [

        {
          name: 'stepDescription',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'stepImage',
          type: 'upload',
          relationTo: 'media',
        }
      ],
    },
    {
      name: 'instructionType',
      type: 'select',
      options: ['installation', 'activation'],
      required: true,
    },
    {
      name: 'sharedSteps',
      type: 'relationship',
      relationTo: 'shared-steps',
      hasMany: true,
    }
  ],
}
