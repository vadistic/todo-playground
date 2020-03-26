import { ApolloServer } from 'apollo-server'
import { typeDefs } from './schema'
import { resolvers } from './resolvers'
import { createContext } from './context'

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
  debug: true,
})
