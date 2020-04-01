import { config } from './config'
import { createApi } from './create-api'

const main = async () => {
  config.loadFile('./.env.json')
  const api = await createApi()

  api.app.listen({ port: api.port }, () => {
    console.log(`🚀 Server ready at ${api.url}`)
  })
}

main()
