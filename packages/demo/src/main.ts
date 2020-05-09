import { config } from '@todo/api-apollo-graphql'

import { createDemo } from './demo'

const main = async () => {
  config.load('./.env.json')
  const { app } = await createDemo()

  app.listen(process.env.PORT || 8080)
}

main()
