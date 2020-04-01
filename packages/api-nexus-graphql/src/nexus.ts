import path from 'path'
import { makeSchema } from 'nexus'
import { nexusPrismaPlugin } from 'nexus-prisma'

import { Query, Mutation, Task, DateTime, scalarEqInputs } from './schema'

const types = {
  Query,
  Mutation,
  Task,
  DateTime,
  ...scalarEqInputs,
}

export const schema = makeSchema({
  types,
  plugins: [
    nexusPrismaPlugin({
      prismaClient: (ctx) => ctx.prisma,
      inputs: {
        // FIXME: does it need to be that ugly?
        prismaClient: path.join(require.resolve('@todo/db-prisma'), '../generated/client'),
      },
    }),
  ],
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
