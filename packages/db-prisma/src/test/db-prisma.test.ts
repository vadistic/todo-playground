import { createDb, DbPrisma } from '..'

describe('db-prisma', () => {
  let db = (undefined as unknown) as DbPrisma

  beforeAll(async () => {
    db = await createDb()
  })

  it('connects', async () => {
    expect(typeof (await db.prisma.task.count())).toBe('number')
  })
})
