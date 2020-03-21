import { createDb, DbTypeOrm } from '..'

describe('db-typeorm', () => {
  let db = (undefined as unknown) as DbTypeOrm

  beforeAll(async () => {
    db = await createDb()
  })

  it('connects', () => {
    expect(db.ctn.isConnected).toBeTruthy()
  })
})
