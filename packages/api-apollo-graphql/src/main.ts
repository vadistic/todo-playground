import { createApi } from './api'
import { config } from './config'

const main = async () => {
  config.load({ file: './.env' })

  const api = await createApi()

  api.app.listen({ port: config.port }, () => {
    console.log(`🚀 Server ready at ${config.local_uri}`)
  })
}

main()
