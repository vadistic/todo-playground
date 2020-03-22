import { testTaskBasic } from '@todo/shared-db'
import './setup-test-db'
import { createDb, DbTypeOrm } from '..'

let db = (undefined as unknown) as DbTypeOrm

beforeAll(async () => {
  db = await createDb()
})

afterAll(async () => {
  await db.ctn.close()
})

describe('db-typeorm > basic', () => {
  it('connects', async () => {
    expect(db.ctn.isConnected).toBeTruthy()
  })

  testTaskBasic(() => db)
})
