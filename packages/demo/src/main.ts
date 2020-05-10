import { config } from './config'
import { createDemo } from './demo'

const main = async () => {
  config.load({ file: './.env' })
  const { app } = await createDemo()

  app.listen(config.port)
}

main()
