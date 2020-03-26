import { server } from './server'
import { config } from './config'

server.listen(config.get('port')).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
