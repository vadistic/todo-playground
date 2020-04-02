import { seedTasks } from '@todo/shared-db'
import { createDb } from '../create-db'

export const seed = async () => {
  const db = await createDb()
  await seedTasks(db)

  await db.close()
}
