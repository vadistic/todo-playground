import { runBasicTaskTests, seedTasks } from '@todo/shared-db'

import { config } from '../config'
import { createDb, TypeormDb } from '../create-db'

config.loadFile('./.env.test.json')

let db: TypeormDb

beforeAll(async () => {
  db = await createDb()
  await seedTasks(db)
})

afterAll(async () => {
  await cleanup()
  await db.close()
})

const cleanup = async () => {
  await db.ctn.dropDatabase()
}

describe('db-typeorm > basic', () => {
  it('connects', async () => {
    expect(db.ctn.isConnected).toBeTruthy()
  })

  runBasicTaskTests(() => db)
})
