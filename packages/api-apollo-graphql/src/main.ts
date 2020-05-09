import dotenv from 'dotenv'

import { createApi } from './api'
import { config } from './config'

const main = async () => {
  dotenv.config()
  config.loadFile('./.env.json')

  const api = await createApi()

  api.app.listen({ port: api.port }, () => {
    console.log(`🚀 Server ready at ${api.url}`)
  })
}

main()
