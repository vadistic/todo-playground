import { testTask } from '@todo/lib-db'

import { config } from '../src/config'
import { createDb, TypeormDb } from '../src/db'

let db: TypeormDb

beforeAll(async () => {
  config.load({ file: './.env.test' })
  db = await createDb()

  await db.drop()
  await db.sync()
  await db.seed()
})

afterAll(async () => {
  await db?.close()
})

describe('db-typeorm > basic', () => {
  it('connects', async () => {
    expect(db.isConnected()).toBeTruthy()
  })

  testTask(() => db.service)
})
