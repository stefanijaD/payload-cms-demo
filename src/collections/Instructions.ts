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
      name: 'platform',
      type: 'select',
      required: true,
      defaultValue: 'both',
      options: [
        { label: 'Mobile', value: 'mobile' },
        { label: 'Web App', value: 'webapp' },
        { label: 'Both', value: 'both' },
      ],
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
          dbName: 'act_base',
          type: 'array',
          admin: {
            description: 'Optional short/base instructions for the activate screen.',
          },
          fields: instructionStepBlocks,
        },
        {
          name: 'detailed',
          dbName: 'act_detail',
          type: 'array',
          required: true,
          admin: {
            description:
              'Detailed instructions shown when the user opens detailed instructions.',
          },
          fields: instructionStepBlocks,
        },
        {
          name: 'manualInstallation',
          type: 'group',
          admin: {
            description:
              'Fallback steps shown to the user if automatic activation fails.',
          },
          fields: [
            {
              name: 'base',
              dbName: 'act_manual_base',
              type: 'array',
              admin: {
                description:
                  'Short/base instructions for the manual installation screen.',
              },
              fields: instructionStepBlocks,
            },
            {
              name: 'detailed',
              dbName: 'act_manual_detail',
              type: 'array',
              admin: {
                description: 'Detailed instructions for manual installation.',
              },
              fields: instructionStepBlocks,
            },
          ],
        },
        {
          name: 'subSteps',
          dbName: 'act_substeps',
          type: 'array',
          required: true,
          admin: {
            description: 'Add one item for each activate substep.',
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
                description:
                  'Select which activate substep these instructions belong to.',
              },
            },
            {
              name: 'base',
              dbName: 'act_sub_base',
              type: 'array',
              admin: {
                description:
                  'Short instructions shown directly on this substep screen.',
              },
              fields: instructionStepBlocks,
            },
            {
              name: 'detailed',
              dbName: 'act_sub_detail',
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
    },

    {
      name: 'connect',
      type: 'group',
      admin: {
        condition: (data) => data?.instructionType === 'connect',
      },
      fields: [
        {
          name: 'base',
          dbName: 'conn_base',
          type: 'array',
          admin: {
            description: 'Optional short/base instructions for the connect screen.',
          },
          fields: instructionStepBlocks,
        },
        {
          name: 'detailed',
          dbName: 'conn_detail',
          type: 'array',
          required: true,
          admin: {
            description:
              'Detailed instructions shown when the user opens detailed instructions.',
          },
          fields: instructionStepBlocks,
        },
      ],
    },
  ],
}

