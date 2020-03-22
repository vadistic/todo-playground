import { createDb, DbPrisma } from '..'

import './setup-test-db'

let db = (undefined as unknown) as DbPrisma

beforeAll(async () => {
  db = await createDb()
})

afterAll(async () => {
  await db.prisma.disconnect()
})

describe('db-prisma > basic', () => {
  it('connects', async () => {
    expect(typeof (await db.prisma.task.count())).toBe('number')
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
    const [res1] = await db.services.task.findMany({ where: { name: 'My' } })
    const res2 = await db.services.task.findMany({
      where: { name: 'assdjh34489u3@#$%^&' },
    })

    expect(res1).toMatchObject(taskFixture)
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
    const res = await db.services.task.deleteOne({
      where: { id: 1 },
    })

    expect(res.id).toBe(taskFixture.id)

    const res2 = await db.services.task.findOne({ where: { id: 1 } })

    expect(res2).toBe(null)
  })
})
