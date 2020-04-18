import { TaskBase, seedTasks } from '@todo/shared-db'

import { MongooseDb, createDb } from '../create-db'

let db = (undefined as unknown) as MongooseDb

beforeAll(async () => {
  db = await createDb()
  await seedTasks(db)
})

afterAll(async () => {
  await db.close()
})

describe('db-mongoose', () => {
  let fix: TaskBase

  beforeAll(async () => {
    fix = await db.service.task.createOne({
      data: { name: 'Finish apps', finished: false },
    })
  })

  it('connects', () => {
    expect(db.mongoose.connection.readyState).toBe(1)
  })

  it('createOne', async () => {
    // const task = await ctx.services.task.createOne({ data: { name: 'abc', finished: false } })

    expect(fix).toMatchObject({ name: 'Finish apps' })
  })

  test('id is virtualised', () => {
    expect(fix).toHaveProperty('id')
  })

  test('_id is deleted', () => {
    expect(fix).not.toHaveProperty('_id')
  })

  test('__v is deleted', () => {
    expect(fix).not.toHaveProperty('__v')
  })

  test('findOne works', async () => {
    const task = await db.service.task.findOne({ where: { id: fix?.id ?? '' } })

    expect(task).toMatchObject(fix ?? {})
  })

  test('findMany works', async () => {
    const tasks = await db.service.task.findMany({ where: { finished: false } })

    expect(tasks.length).toBeGreaterThan(5)
    expect(tasks.every((task) => typeof task.id === 'string')).toBeTruthy()
  })
})
