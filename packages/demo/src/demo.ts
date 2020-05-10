import { createServer } from '@todo/api-apollo-graphql'
import express from 'express'

import { routes, dirs, config } from './config'
import { demoHtml } from './views/demo'

export const createDemo = async () => {
  const app = express()
  const { server } = await createServer()

  server.applyMiddleware({ app, path: '/' + config.graphql_path })

  app.use(routes.uiReactBasic, express.static(dirs.uiReactBasic))

  const demoHtmlSnap = demoHtml()
  app.get('/', (req, res) => res.send(demoHtmlSnap))

  return { app }
}
