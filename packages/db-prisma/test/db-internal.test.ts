import { config } from '../src/config'
import { createDb, PrismaDb } from '../src/db'

let db: PrismaDb

beforeAll(async () => {
  config.loadFile('./.env.test.json')
  process.env.DB_URL = config.get('db_url')

  db = await createDb()
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
