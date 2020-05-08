import { TaskBase, testTask } from '@todo/lib-db'

import { config } from '../config'
import { MongooseDb, createDb } from '../db'

let db = (undefined as unknown) as MongooseDb

beforeAll(async () => {
  config.loadFile('./.env.test.json')

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

describe('db-mongoose > internal', () => {
  let fix: TaskBase

  beforeAll(async () => {
    fix = await db.service.task.createOne({
      data: { name: 'Finish apps', finished: false },
    })
  })

  it('connects', () => {
    expect(db.isConnected()).toBeTruthy()
  })

  it('use test database', () => {
    expect(db.ctn.db.databaseName).toBe('test')
  })

  test('id is virtualised', () => {
    expect(fix).toHaveProperty('id')
  })

  test('_id is deleted', () => {
    expect(fix).not.toHaveProperty('_id')
  })

  test('__v is deleted', () => {
    expect(fix).not.toHaveProperty('__v')
  })
})

describe('db-mongoose > service', () => {
  testTask(() => db.service)
})
