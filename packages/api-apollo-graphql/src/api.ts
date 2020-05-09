import { Depromisify } from '@todo/lib-db'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'

import { config } from './config'
import { createContext } from './context'
import { resolvers } from './resolvers'
import { typeDefs } from './schema'

export const createApi = async () => {
  const app = express()

  const ctx = await createContext()

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ctx,
    debug: config.get('debug'),
    engine: false,
    introspection: true,
    playground: true,
  })

  const graphqlRoute = config.get('api_graphql_route').replace(/^\/|\/$/g, '')
  const port = config.get('api_port')

  // TODO: add public url or smth
  const url = 'http://localhost:' + port + '/' + graphqlRoute

  server.applyMiddleware({ app, path: '/' + graphqlRoute })

  // teardown
  const close = async () => {
    await ctx.close()
    await server.stop()
  }

  // graceful exit
  process.on('SIGINT', () => {
    close().then(() => {
      console.log('byebye!')
    })

    setTimeout(() => {
      process.exit(0)
    }, 2000)
  })

  return {
    graphqlRoute,
    server,
    app,
    url,
    port,
    close,
  }
}

export type Api = Depromisify<ReturnType<typeof createApi>>
