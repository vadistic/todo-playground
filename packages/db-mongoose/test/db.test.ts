import { TaskBase, testTask } from '@todo/lib-db'

import { config } from '../src/config'
import { MongooseDb, createDb } from '../src/db'

let db = (undefined as unknown) as MongooseDb

beforeAll(async () => {
  config.load({ file: './.env.test' })

  db = await createDb()

  await db.drop()
  await db.sync()
  await db.seed()
})

afterAll(async () => {
  if (db) {
    await db.close()
  }
})

describe('db-mongoose', () => {
  let fixtureRes: TaskBase

  beforeAll(async () => {
    fixtureRes = await db.service.task.createOne({
      data: { name: 'Finish apps', finished: false },
    })
  })

  test('works', () => {
    expect(db.isConnected()).toBeTruthy()
  })

  test('id is virtualised', () => {
    expect(fixtureRes).toHaveProperty('id')
  })

  test('_id is deleted', () => {
    expect(fixtureRes).not.toHaveProperty('_id')
  })

  test('__v is deleted', () => {
    expect(fixtureRes).not.toHaveProperty('__v')
  })

  testTask(() => db.service)
})
