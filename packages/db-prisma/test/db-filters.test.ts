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
