import { ApolloServer } from 'apollo-server'
import { createContext } from './context'
import { schema } from './nexus'

export const server = new ApolloServer({
  schema: schema,
  context: createContext,
})
