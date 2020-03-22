import { testTaskBasic, seedTasks } from '@todo/shared-db'
import { createDb, DbPrisma } from '..'

import './setup-test-db'

let db = (undefined as unknown) as DbPrisma

beforeAll(async () => {
  db = await createDb()
  await seedTasks(db)
})

afterAll(async () => {
  await db.prisma.disconnect()
})

describe('db-prisma > basic', () => {
  it('connects', async () => {
    expect(typeof (await db.prisma.task.count())).toBe('number')
  })

  testTaskBasic(() => db)

  it('seeds db', async () => {
    const res = await db.services.task.findMany({ where: {} })

    expect(res.length).toBeGreaterThanOrEqual(20)
  })
})
