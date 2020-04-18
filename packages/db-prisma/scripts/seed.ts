import { createDb, config } from '../src'

const main = async () => {
  config.loadFile('.env.json')

  const db = await createDb()

  await db.seed()
}

main()
