import { createModule, Client } from '@todo/db-prisma'
import { seedTasks } from '@todo/lib-db'

import { config } from '../src/config'
import { createTestClient, TestClient } from './create-test-client'

config.loadFile('./.env.test.json')

let client: TestClient

beforeAll(async () => {
  // seed
  const ctx = await createModule()
  await seedTasks(ctx)
  await ctx.close()

  client = await createTestClient()
})

afterAll(async () => {
  await client.close()

  // clean
  const ctx = await createModule()
  await ctx.prisma.task.deleteMany({})
  await ctx.close()
})

describe('api-apollo-graphql', () => {
  let tasks: Client.Task[]

  const TASKS_QUERY = /* GraphQL */ `
    query Tasks {
      tasks {
        id
        name
        content
        finished
      }
    }
  `

  beforeAll(async () => {
    const { data } = await client.execute<{ tasks: Client.Task[] }>({ query: TASKS_QUERY })

    tasks = data?.tasks
  })

  it('query many tasks', async () => {
    expect(tasks.length).toBeGreaterThan(5)
    expect(tasks.every((task) => typeof task.id === 'string')).toBeTruthy()
  })

  it('query one task', async () => {
    const { id } = tasks[Math.floor(Math.random() * tasks.length)]

    const TASK_QUERY = /* GraphQL */ `
      query Task($id: ID!) {
        task(id: $id) {
          id
          name
          content
          finished
        }
      }
    `

    const { data, errors } = await client.execute<{ task: Client.Task }>({
      query: TASK_QUERY,
      variables: { id },
    })

    expect(errors).toBeUndefined()
    expect(Object.keys(data?.task)).toContain(['id', 'name', 'content', 'finished'])
  })
})
