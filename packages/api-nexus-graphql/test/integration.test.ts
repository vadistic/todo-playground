import { createDb, Client } from '@todo/db-prisma'
import { seedTasks } from '@todo/shared-db'

import { config } from '../src/config'
import { createTestClient, TestClient } from './create-test-client'

config.loadFile('./.env.test.json')

let client: TestClient

beforeAll(async () => {
  // seed
  const db = await createDb()
  await seedTasks(db)
  await db.close()

  client = await createTestClient()
})

afterAll(async () => {
  await client.close()

  // clean
  const ctx = await createDb()
  await ctx.prisma.task.deleteMany({})
  await ctx.close()
})

describe('api-nexus-graphql', () => {
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
      query Task($where: UniqueIDInput!) {
        task(where: $where) {
          id
          name
          content
          finished
        }
      }
    `

    const { data, errors } = await client.execute<{ task: Client.Task }>({
      query: TASK_QUERY,
      variables: { where: { id } },
    })

    expect(errors).toBeUndefined()
    expect(Object.keys(data?.task)).toMatchObject(['id', 'name', 'content', 'finished'])
  })
})
