import { config } from '../src/config'
import { createDb, PrismaDb } from '../src/db'

let db: PrismaDb

beforeAll(async () => {
  config.load({ file: './.env.test' })

  db = await createDb()

  await db.drop()
  await db.seed()
})

afterAll(async () => {
  await db.drop()
  await db.close()
})

describe('db-prisma > internal', () => {
  test('.isConnected()', async () => {
    await db.connect()
    expect(db.isConnected()).toBeTruthy()
  })

  test('.seed()', async () => {
    // was seeded in before all
    const res = await db.service.task.findMany({ where: {} })

    expect(res.length).toBeGreaterThanOrEqual(20)
  })
})
