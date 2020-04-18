import { makeSchema } from '@nexus/schema'
import { nexusPrismaPlugin } from 'nexus-prisma'
import path from 'path'

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
        prismaClient: path.join(require.resolve('@todo/db-prisma'), '../generated/client'),
      },
    }),
  ],
  outputs: {
    schema: path.join(__dirname, '/schema.graphql'),
    typegen: path.join(__dirname, '/generated/nexus.ts'),
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
