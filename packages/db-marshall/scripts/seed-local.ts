import { createDb, config } from '../src'

const main = async () => {
  config.loadFile('./.env.local.json')

  const db = await createDb()

  await db.drop()
  await db.seed()
  await db.close()

  console.log('seed complete!')
}

main()
