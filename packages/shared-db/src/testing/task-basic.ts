import { ServicesBase } from '../services'

export const taskBasicTests = (dbCb: () => { services: ServicesBase }) => {
  const taskFixture = {
    id: 1,
    name: 'My unique task',
    content: null,
    finished: false,
  }

  it('createOne', async () => {
    const { id, ...data } = taskFixture

    const res = await dbCb().services.task.createOne({ data })

    expect(res).toMatchObject(data)

    // set id for further tests
    taskFixture.id = id
  })

  it('findOne', async () => {
    const res = await dbCb().services.task.findOne({
      where: { id: taskFixture.id },
    })

    expect(res).toMatchObject(taskFixture)
  })

  it('findMany > name filter ok', async () => {
    const [res] = await dbCb().services.task.findMany({ where: { name: 'My' } })
    expect(res).toMatchObject(taskFixture)
  })

  it('findMany > name filter fail', async () => {
    const res = await dbCb().services.task.findMany({
      where: { name: 'assdjh34489u3@#$%^&' },
    })

    expect(res.length).toBe(0)
  })

  it('updateOne', async () => {
    const updateData = { name: 'My renamed task', finished: true }

    const res = await dbCb().services.task.updateOne({
      where: { id: 1 },
      data: updateData,
    })

    expect(res).toMatchObject({
      ...taskFixture,
      ...updateData,
    })
  })

  it('deleteOne', async () => {
    const res = await dbCb().services.task.deleteOne({
      where: { id: 1 },
    })

    expect(res.id).toBe(taskFixture.id)

    const res2 = await dbCb().services.task.findOne({ where: { id: 1 } })

    expect(res2).toBe(null)
  })
}
