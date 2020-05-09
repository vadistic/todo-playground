import { createDb } from '@todo/db-marshall'
import { TaskBase } from '@todo/lib-db'

import { config } from '../src/config'
import { createTestClient, TestClient } from './create-test-client'

config.loadFile('./.env.test.json')

let client: TestClient

beforeAll(async () => {
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

describe('api-apollo-graphql', () => {
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

  it('task query', async () => {
    const resMany = await client.execute<{ tasks: TaskBase[] }>({ query: TASKS_QUERY })

    expect(resMany.errors).toBeUndefined()

    expect(resMany.data.tasks.length).toBeGreaterThan(5)
    expect(resMany.data.tasks.every((task) => typeof task.id === 'string')).toBeTruthy()

    const resOne = await client.execute<{ task: TaskBase }>({
      query: TASK_QUERY,
      variables: { id: resMany.data.tasks[0].id },
    })

    expect(resOne.errors).toBeUndefined()

    expect(resOne.data.task).toMatchObject(resMany.data.tasks[0])
  })
})
