import './setup'
import { MongooseModule, createModule } from '../create'

let ctx = (undefined as unknown) as MongooseModule

beforeAll(async () => {
  ctx = await createModule()
})

afterAll(async () => {
  await ctx.db.disconnect()
})

describe('db-mongoose', () => {
  it('connects', () => {
    expect(ctx.db.connection.readyState).toBe(1)
  })

  it('deletes empty keys from filters', async () => {
    await ctx.services.task.findMany({ where: { content: 'abc' } })
  })
})
