import { testTaskBasic } from '@todo/shared-db'
import { createDb, DbPrisma } from '..'

import './setup-test-db'

let db = (undefined as unknown) as DbPrisma

beforeAll(async () => {
  db = await createDb()
})

afterAll(async () => {
  await db.prisma.disconnect()
})

describe('db-prisma > basic', () => {
  it('connects', async () => {
    expect(typeof (await db.prisma.task.count())).toBe('number')
  })

  testTaskBasic(() => db)

  it('db is seeded', async () => {
    const res = await db.services.task.findMany({ where: {} })

    expect(res.length).toBeGreaterThanOrEqual(20)
  })
})
