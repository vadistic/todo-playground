import { ApolloServer } from 'apollo-server-express'
import express from 'express'

import { config } from './config'
import { createContext } from './context'
import { resolvers } from './resolvers'
import { typeDefs } from './schema'
import { Depromisify } from './types'

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

  const graphqlPath = config.get('graphql_path').replace(/^\/|\/$/g, '')
  const port = config.get('port')
  // TODO: add public url env or smth
  const url = 'http://localhost:' + port + '/' + graphqlPath

  server.applyMiddleware({ app, path: '/' + graphqlPath })

  // teardown
  const close = async () => {
    await ctx.close()
    await server.stop()
  }

  // graceful exit
  const exit = () => {
    close().then(() => {
      console.log('byebye!')
    })

    setTimeout(() => {
      process.exit(0)
    }, 2000)
  }

  process.on('SIGINT', exit)

  return {
    graphqlPath,
    server,
    app,
    url,
    port,
    close,
  }
}

export type Api = Depromisify<ReturnType<typeof createApi>>
