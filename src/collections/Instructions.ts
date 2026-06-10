import type { CollectionConfig } from 'payload'
import { instructionStepBlocks } from '../fields/instructionStepBlocks'

export const Instructions: CollectionConfig = {
  slug: 'instructions',
  labels: {
    singular: 'Instruction',
    plural: 'Instructions',
  },
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
      name: 'instructionType',
      type: 'select',
      required: true,
      options: [
        { label: 'Activate', value: 'activate' },
        { label: 'Connect', value: 'connect' },
      ],
    },

    {
      name: 'activate',
      type: 'group',
      admin: {
        condition: (data) => data?.instructionType === 'activate',
      },
      fields: [
        {
          name: 'base',
          type: 'array',
          admin: {
            description: 'Optional short/base instructions for the activate screen.',
          },
          fields: instructionStepBlocks,
        },
        {
          name: 'detailed',
          type: 'array',
          required: true,
          admin: {
            description: 'Detailed instructions shown when the user opens detailed instructions.',
          },
          fields: instructionStepBlocks,
        },
      ],
    },

    {
      name: 'connect',
      type: 'group',
      admin: {
        condition: (data) => data?.instructionType === 'connect',
      },
      fields: [
        {
          name: 'subSteps',
          type: 'array',
          required: true,
          admin: {
            description: 'Add one item for each connect substep.',
          },
          fields: [
            {
              name: 'key',
              type: 'select',
              required: true,
              options: [
                { label: 'Rename', value: 'rename' },
                { label: 'Turn on', value: 'turn_on' },
                { label: 'Roaming', value: 'roaming' },
              ],
              admin: {
                description: 'Select which connect substep these instructions belong to.',
              },
            },
            {
              name: 'base',
              type: 'array',
              admin: {
                description: 'Short instructions shown directly on this substep screen.',
              },
              fields: instructionStepBlocks,
            },
            {
              name: 'detailed',
              type: 'array',
              required: true,
              admin: {
                description:
                  'Detailed instructions for this substep. Use shared steps/groups if this content is reused.',
              },
              fields: instructionStepBlocks,
            },
          ],
        },
      ],
    }
  ],
}