import { config } from '../src/config'
import { createDb, FaunaDb } from '../src/db'

let db: FaunaDb

beforeAll(async () => {
  config.load({ file: './.env.test' })
  db = await createDb()
})

describe('db-fauna', () => {
  // eslint-disable-next-line jest/expect-expect
  it('sync', async () => {
    await db.sync()
  })

  it('createOne & findOne', async () => {
    const task1 = await db.service.task.createOne({ data: { name: 'My Task' } })

    const taskOk = await db.service.task.findOne({ where: { id: task1.id } })
    const taskNull = await db.service.task.findOne({ where: { id: '123' } })

    expect(taskOk).toBeDefined()
    expect(taskNull).toBe(null)
  })

  // eslint-disable-next-line jest/expect-expect
  it('drop', async () => {
    await db.drop()
  })
})
