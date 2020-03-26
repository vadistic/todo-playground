import { runBasicTaskTests, seedTasks } from '@todo/shared-db'
import { createModule, TypeormModule } from '../create'
import { config } from '../config'

config.loadFile('./.env.test.json')

let ctx: TypeormModule

beforeAll(async () => {
  ctx = await createModule()
  await seedTasks(ctx)
})

afterAll(async () => {
  await cleanup()
  await ctx.close()
})

const cleanup = async () => {
  await ctx.ctn.dropDatabase()
}

describe('db-typeorm > basic', () => {
  it('connects', async () => {
    expect(ctx.ctn.isConnected).toBeTruthy()
  })

  runBasicTaskTests(() => ctx)
})
