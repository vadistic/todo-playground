import dotenv from 'dotenv'

import { createDb, config } from '../src'

const main = async () => {
  dotenv.config()
  config.loadFile('./.env.json')
  config.validate({ allowed: 'strict' })

  const db = await createDb()

  await db.connect()
  await db.drop()
  await db.seed()
  await db.close()

  console.log('seed complete!')
}

main()
