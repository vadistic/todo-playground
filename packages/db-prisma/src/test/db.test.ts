import './setup'

import { testTaskBasic } from '@todo/shared-db'
import { createModule, PrismaModule } from '..'

let ctx = (undefined as unknown) as PrismaModule

beforeAll(async () => {
  ctx = await createModule()
})

afterAll(async () => {
  await ctx.prisma.disconnect()
})

describe('db-prisma > basic', () => {
  it('connects', async () => {
    expect(typeof (await ctx.prisma.task.count())).toBe('number')
  })

  testTaskBasic(() => ctx)

  it('db is seeded', async () => {
    const res = await ctx.services.task.findMany({ where: {} })

    expect(res.length).toBeGreaterThanOrEqual(20)
  })
})
