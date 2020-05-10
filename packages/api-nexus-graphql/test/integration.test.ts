import { createDb } from '@todo/db-marshall'
import { TaskBase } from '@todo/lib-db'

import { config } from '../src'
import { createTestClient, TestClient } from './create-test-client'

let client: TestClient

beforeAll(async () => {
  config.load({ file: './.env.test' })
  const db = await createDb()

  await db.drop()
  await db.sync()
  await db.seed()
  await db.close()

  client = await createTestClient()
})

afterAll(async () => {
  await client.close()
})

describe('api-nexus-graphql', () => {
  let tasks: TaskBase[]

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
    const { data } = await client.execute<{ tasks: TaskBase[] }>({ query: TASKS_QUERY })

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
        task(where: { id: $id }) {
          id
          name
          content
          finished
        }
      }
    `

    const { data, errors } = await client.execute<{ task: TaskBase }>({
      query: TASK_QUERY,
      variables: { id },
    })

    expect(errors).toBeUndefined()
    expect(Object.keys(data?.task)).toEqual(['id', 'name', 'content', 'finished'])
  })
})
