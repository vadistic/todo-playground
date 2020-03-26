import { seedTasks } from '@todo/shared-db'
import { createModule } from '../create'

export const seed = async () => {
  const ctx = await createModule()
  await seedTasks(ctx)

  await ctx.close()
}
