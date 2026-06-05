import { CollectionConfig } from "payload";

export const SharedSteps: CollectionConfig = {
    slug: 'shared-steps',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'stepDescription',
            type: 'text',
            localized: true,
        },
        {
            name: 'stepImage',
            type: 'upload',
            relationTo: 'media',
        }
    ]
}