import { testTask } from '@todo/lib-db'

import { config } from '../src/config'
import { createDb, MarshallDb } from '../src/db'
import { SimpleModel, simpleModelExample } from './example.model'

let db: MarshallDb

beforeAll(async () => {
  config.load({ file: './.env.test' })
  db = await createDb()

  await db.connect()
  await db.drop()
  await db.seed()
})

afterAll(async () => {
  await db.close()
})

describe('db-marshall', () => {
  test('works', async () => {
    await db.database.add(simpleModelExample)

    const res = await db.database.query(SimpleModel).find()

    const { id, ...rest } = simpleModelExample
    expect(res[0]).toMatchObject(rest)
  })

  test('task findMany > null filter', async () => {
    const res = await db.service.task.findMany({ where: { content: null } })

    expect(res.every((el) => !el.content)).toBeTruthy()
  })

  testTask(() => db.service)

  test('close', async () => {
    expect(db.isConnected()).toBeTruthy()

    await db.close()

    expect(db.isConnected()).toBeFalsy()
  })
})
