import './setup'

import { testTaskBasic } from '@todo/shared-db'
import { createModule, TypeormModule } from '../create'

let ctx = (undefined as unknown) as TypeormModule

beforeAll(async () => {
  ctx = await createModule()
})

afterAll(async () => {
  await ctx.ctn.close()
})

describe('db-typeorm > basic', () => {
  it('connects', async () => {
    expect(ctx.ctn.isConnected).toBeTruthy()
  })

  testTaskBasic(() => ctx)
})
