import { Depromisify } from '@todo/lib-db'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'

import { config } from './config'
import { createContext } from './context'
import { resolvers } from './resolvers'
import { typeDefs } from './schema'

export type Server = ApolloServer

export const createServer = async () => {
  const ctx = await createContext()

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ctx,
    debug: config.debug,
    engine: false,
    introspection: true,
    playground: true,
  })

  return { server, ctx }
}

export type Api = Depromisify<ReturnType<typeof createApi>>

export const createApi = async () => {
  const app = express()

  const { server, ctx } = await createServer()

  server.applyMiddleware({ app, path: '/' + config.graphql_path })

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
    server,
    app,
    close,
  }
}
