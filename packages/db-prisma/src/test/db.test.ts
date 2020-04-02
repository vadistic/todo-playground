import { runBasicTaskTests, seedTasks } from '@todo/shared-db'
import { createDb, PrismaDb } from '../create-db'
import { config } from '../config'

config.loadFile('./.env.test.json')
process.env.DB_URL = config.get('db_url')

let db: PrismaDb

beforeAll(async () => {
  db = await createDb()
  await seedTasks(db)
})

afterAll(async () => {
  await cleanup()
  await db.close()
})

const cleanup = async () => {
  await db.prisma.task.deleteMany({ where: { id: { not: null } } })
}

describe('db-prisma > basic', () => {
  test('connection', async () => {
    const count = await db.prisma.task.count()

    expect(typeof count).toBe('number')
  })

  runBasicTaskTests(() => db)

  test('db is seeded', async () => {
    const res = await db.service.task.findMany({ where: {} })

    expect(res.length).toBeGreaterThanOrEqual(20)
  })
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

describe('db-prisma > pagination', () => {
  test('limit', async () => {
    const res = await db.service.task.findMany({
      limit: 4,
    })

    expect(res.length).toBe(4)
  })

  test('sort', async () => {
    const res = await db.service.task.findMany({
      limit: 7,
      order: 'DESC',
    })

    const names = res.map((val) => val.name)

    expect(names.sort()).toEqual(names)
  })

  test('after', async () => {
    const getName = (val: any) => val.name

    const all = await db.service.task.findMany({ order: 'ASC' })

    const res1 = await db.service.task.findMany({ limit: 4, order: 'ASC' })
    const res2 = await db.service.task.findMany({ limit: 4, after: res1[3].id, order: 'ASC' })
    const res3 = await db.service.task.findMany({ limit: 4, after: res2[3].id, order: 'ASC' })

    expect(res1.map(getName)).toEqual(all.slice(0, 4).map(getName))
    expect(res2.map(getName)).toEqual(all.slice(4, 8).map(getName))
    expect(res3.map(getName)).toEqual(all.slice(8, 12).map(getName))
  })

  test('before', async () => {
    const getName = (val: any) => val.name

    const all = await db.service.task.findMany({ order: 'ASC' })

    const forward = await db.service.task.findMany({ limit: 12, order: 'ASC' })
    const backward = await db.service.task.findMany({
      limit: 4,
      before: forward[10].id,
      order: 'ASC',
    })

    const indicies = backward.map(getName).map((name) => all.findIndex((el) => el.name === name))

    expect(indicies).toEqual([6, 7, 8, 9])
    expect(backward).toEqual(forward.slice(6, 10))
  })
})
