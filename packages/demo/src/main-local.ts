import { config } from './config'
import { createDemo } from './demo'

const main = async () => {
  config.load({ file: './.env.local' })

  if (config.debug) {
    console.log('config')
    console.log({ ...config })
  }

  const { app } = await createDemo()

  app.listen(config.port)
}

main()
