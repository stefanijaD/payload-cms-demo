import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Instructions } from './collections/Instructions'
import { SharedSteps } from './collections/SharedSteps'
import { SharedStepGroups } from './collections/SharedStepGroups'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Instructions, SharedSteps, SharedStepGroups],
  localization: {
    locales: [
      { label: 'Czech', code: 'cs' },
      { label: 'Danish', code: 'da' },
      { label: 'German', code: 'de' },
      { label: 'English', code: 'en' },
      { label: 'Spanish', code: 'es' },
      { label: 'French', code: 'fr' },
      { label: 'Hungarian', code: 'hu' },
      { label: 'Italian', code: 'it' },
      { label: 'Korean', code: 'ko' },
      { label: 'Dutch', code: 'nl' },
      { label: 'Norwegian', code: 'no' },
      { label: 'Polish', code: 'pl' },
      { label: 'Portuguese', code: 'pt' },
      { label: 'Slovak', code: 'sk' },
      { label: 'Swedish', code: 'sv' },
      { label: 'Chinese', code: 'zh' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
