import { seedTasks } from '@todo/shared-db'
import { createModule } from '../create'

export const seed = async () => {
  process.env.SQLITE_URL = '/temp/dev.db'

  const mod = await createModule()
  await seedTasks(mod)
}

seed()
