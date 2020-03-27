import { makeSchema } from 'nexus'
import { nexusPrismaPlugin } from 'nexus-prisma'

import * as types from './schema'

export const schema = makeSchema({
  types,
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})
