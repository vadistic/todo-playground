import { runBasicTaskTests, seedTasks } from '@todo/shared-db'
import { createModule, PrismaModule } from '../create'
import { config } from '../config'

config.loadFile('./.env.test.json')
process.env.DB_URL = config.get('db_url')

let ctx: PrismaModule

beforeAll(async () => {
  ctx = await createModule()
  await seedTasks(ctx)
})

afterAll(async () => {
  await cleanup()
  await ctx.close()
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
    const res = await ctx.service.task.findMany({ where: {} })

    expect(res.length).toBeGreaterThanOrEqual(20)
  })
})

describe('db-prisma > filters', () => {
  test('string filters', async () => {
    const [{ name, content }] = await ctx.service.task.findMany({
      where: { name: 'SMS', content: 'dolor' },
    })

    expect(name).toContain('SMS')
    expect(content).toContain('dolor')
  })

  test('null/undefined filters', async () => {
    const res1 = await ctx.service.task.findMany({
      where: { content: null },
    })

    expect(res1.every(({ content }) => content === null)).toBeTruthy()

    const res2 = await ctx.service.task.findMany({
      where: { content: undefined },
    })

    expect(res2.some(({ content }) => content === null)).toBeTruthy()
    expect(res2.some(({ content }) => content !== null)).toBeTruthy()
  })
})
