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
