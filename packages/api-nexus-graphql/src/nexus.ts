import { makeSchema } from '@nexus/schema'
import { GraphQLSchema } from 'graphql'
import path from 'path'

import { Query, Mutation, Task, DateTime, scalarEqInputs } from './schema'

const types = {
  Query,
  Mutation,
  Task,
  DateTime,
  ...scalarEqInputs,
}

export const schema: GraphQLSchema = makeSchema({
  types,
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
