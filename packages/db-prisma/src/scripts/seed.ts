import { seedTasks } from '@todo/shared-db'
import { createDb } from '../db'

export const seed = async () => {
  process.env.SQLITE_URL = 'file:../temp/dev.db'

  const db = await createDb()
  await seedTasks(db)
}

seed()
  .then(() => {
    console.log('Seed ok!')
    // dunno why ts-node hangs
    process.exit()
  })
  .catch(e => {
    console.log('Seed fail!')
    console.error(e)
  })
