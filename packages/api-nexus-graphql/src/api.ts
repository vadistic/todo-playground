import { ApolloServer } from 'apollo-server-express'
import express from 'express'

import { config } from './config'
import { createContext } from './context'
import { schema } from './nexus'

export const createServer = async () => {
  const ctx = await createContext()

  const server = new ApolloServer({
    schema,
    context: ctx,
    debug: config.debug,
    engine: false,
    introspection: true,
    playground: true,
  })

  return { server, ctx }
}

export const createApi = async () => {
  const app = express()

  const { ctx, server } = await createServer()

  server.applyMiddleware({ app, path: '/' + config.graphql_path })

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
    server,
    app,
    close,
  }
}

type Depromisify<T> = T extends Promise<infer U> ? U : never

export type Api = Depromisify<ReturnType<typeof createApi>>
