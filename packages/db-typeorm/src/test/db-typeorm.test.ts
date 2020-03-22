import './setup-test-db'
import { createDb, DbTypeOrm } from '..'

let db = (undefined as unknown) as DbTypeOrm

beforeAll(async () => {
  db = await createDb()
})

afterAll(async () => {
  await db.ctn.close()
})

describe('db-typeorm > basic', () => {
  it('connects', async () => {
    expect(db.ctn.isConnected).toBeTruthy()
  })

  const taskFixture = {
    id: 1,
    name: 'My task',
    content: null,
    finished: false,
  }

  it('createOne', async () => {
    const { id, ...data } = taskFixture

    const res = await db.services.task.createOne({ data })

    expect(res).toMatchObject(taskFixture)
  })

  it('findOne', async () => {
    const res = await db.services.task.findOne({
      where: { id: taskFixture.id },
    })

    expect(res).toMatchObject(taskFixture)
  })

  it('findMany', async () => {
    const res1 = await db.services.task.findMany({ where: { name: 'My' } })
    const res2 = await db.services.task.findMany({
      where: { name: 'assdjh34489u3', finished: false },
    })

    expect(res1[0]).toMatchObject(taskFixture)
    expect(res2.length).toBe(0)
  })

  it('updateOne', async () => {
    const updateData = { name: 'My renamed task', finished: true }

    const res = await db.services.task.updateOne({
      where: { id: 1 },
      data: updateData,
    })

    expect(res).toMatchObject({
      ...taskFixture,
      ...updateData,
    })
  })

  it('deleteOne', async () => {
    const res1 = await db.services.task.deleteOne({
      where: { id: 1 },
    })

    expect(res1.id).toBe(taskFixture.id)

    const res2 = await db.services.task.findOne({ where: { id: 1 } })

    expect(res2).toBe(null)
  })
})
