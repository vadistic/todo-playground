import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { typeDefs } from './schema'
import { resolvers } from './resolvers'
import { createContext } from './context'
import { config } from './config'

export const createApi = async () => {
  const app = express()

  const ctx = await createContext()

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ctx,
    debug: true,
    engine: false,
    introspection: true,
    playground: true,
  })

  const graphqlPath = config.get('graphql_path').replace(/^\/|\/$/g, '')
  const port = config.get('port')
  // TODO: add public url env or smth
  const url = `http://` + 'localhost' + ':' + port + '/' + graphqlPath

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

type Depromisify<T> = T extends Promise<infer U> ? U : never

export type Api = Depromisify<ReturnType<typeof createApi>>
