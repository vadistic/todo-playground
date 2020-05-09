import { config } from '../src/config'
import { createDb, MarshallDb } from '../src/db'
import { SimpleModel, simpleModelExample } from './example.model'

let db: MarshallDb

beforeAll(async () => {
  config.loadFile('./.env.test.json')
  db = await createDb()

  await db.connect()
})

afterAll(async () => {
  await db.close()
})

describe('db-fauna', () => {
  // eslint-disable-next-line jest/expect-expect
  it('sync', async () => {
    await db.sync()
  })

  // eslint-disable-next-line jest/expect-expect
  it('seed', async () => {
    await db.seed()
  })

  it('works', async () => {
    await db.database.add(simpleModelExample)

    const res = await db.database.query(SimpleModel).find()

    const { id, ...rest } = simpleModelExample
    expect(res[0]).toMatchObject(rest)
  })

  it('createOne', async () => {
    await db.service.task.createOne({ data: { name: 'My Task' } })

    const res = await db.service.task.findMany({})

    console.log(res)

    expect(res).toBeDefined()
  })

  it('close', async () => {
    expect(db.isConnected()).toBeTruthy()

    await db.close()

    expect(db.isConnected()).toBeFalsy()
  })
})
