import { createApi } from './api'
import { config } from './config'

const main = async () => {
  config.loadFile('./.env.local.json')

  const api = await createApi()

  api.app.listen({ port: api.port }, () => {
    console.log(`🚀 Server ready at ${api.url}`)
  })
}

main()
