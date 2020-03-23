import './setup'
import { BackendMongoose, createBackend } from '../create'

let mod = (undefined as unknown) as BackendMongoose

beforeAll(async () => {
  mod = await createBackend()
})

afterAll(async () => {
  await mod.db.disconnect()
})

describe('db-mongoose', () => {
  it('connects', () => {
    expect(mod.db.connection.readyState).toBe(1)
  })

  it('deletes empty keys from filters', async () => {
    await mod.services.task.findMany({ where: { content: 'abc' } })
  })
})
