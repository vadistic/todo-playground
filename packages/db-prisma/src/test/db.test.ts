import { runBasicTaskTests, seedTasks } from '@todo/shared-db'
import { createModule, PrismaModule } from '../create'
import { config } from '../config'

config.loadFile('./.env.test.json')
process.env.DB_URL = config.get('db_url')

let ctx: PrismaModule

beforeAll(async () => {
  ctx = await createModule()
  await cleanup()
  await seedTasks(ctx)
})

afterAll(async () => {
  await cleanup()
  await ctx.prisma.disconnect()
})

const cleanup = async () => {
  await ctx.prisma.task.deleteMany({ where: { id: { not: null } } })
}

describe('db-prisma > basic', () => {
  test('connection', async () => {
    const count = await ctx.prisma.task.count()

    expect(typeof count).toBe('number')
  })

  runBasicTaskTests(() => ctx)

  test('db is seeded', async () => {
    const res = await ctx.services.task.findMany({ where: {} })

    expect(res.length).toBeGreaterThanOrEqual(20)
  })
})
