import { config } from '../config'
import { createDb, PrismaDb } from '../db'

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

describe('db-prisma > filters', () => {
  test('string filters', async () => {
    const [{ name, content }] = await db.service.task.findMany({
      where: { name: 'SMS', content: 'dolor' },
    })

    expect(name).toContain('SMS')
    expect(content).toContain('dolor')
  })

  test('null/undefined filters', async () => {
    const res1 = await db.service.task.findMany({
      where: { content: null },
    })

    expect(res1.every(({ content }) => content === null)).toBeTruthy()

    const res2 = await db.service.task.findMany({
      where: { content: undefined },
    })

    expect(res2.some(({ content }) => content === null)).toBeTruthy()
    expect(res2.some(({ content }) => content !== null)).toBeTruthy()
  })
})
