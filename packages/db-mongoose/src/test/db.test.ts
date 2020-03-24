import './setup'
import { TaskBase } from '@todo/shared-db'
import { MongooseModule, createModule } from '../create'

let ctx = (undefined as unknown) as MongooseModule

beforeAll(async () => {
  ctx = await createModule()
})

afterAll(async () => {
  await ctx.db.disconnect()
})

describe('db-mongoose', () => {
  let fix: TaskBase | undefined

  it('connects', () => {
    expect(ctx.db.connection.readyState).toBe(1)
  })

  it('createOne', async () => {
    // const task = await ctx.services.task.createOne({ data: { name: 'abc', finished: false } })
    const task = await ctx.services.task.createOne({
      data: { name: 'Finish apps', finished: false },
    })

    expect(task).toMatchObject({ name: 'Finish apps' })

    fix = task
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
    const task = await ctx.services.task.findOne({ where: { id: fix?.id || '' } })

    expect(task).toMatchObject(fix || {})
  })

  test('findMany works', async () => {
    const tasks = await ctx.services.task.findMany({ where: { finished: false } })

    console.log(tasks)
  })
})
