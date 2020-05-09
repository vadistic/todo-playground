import { createServer } from '@todo/api-apollo-graphql'
import express from 'express'

import { routes, dirs } from './routes'
import { demoHtml } from './views/demo'

export const createDemo = async () => {
  const app = express()
  const { server } = await createServer()

  server.applyMiddleware({ app, path: routes.apiApolloGraphql })

  app.use(routes.uiReactBasic, express.static(dirs.uiReactBasic))

  app.get('/', (req, res) => res.send(demoHtml))

  return { app }
}
