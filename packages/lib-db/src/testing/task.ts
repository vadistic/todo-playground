import { ServiceBase, TaskCreateData, TaskBase } from '../interfaces'

// eslint-disable-next-line jest/no-export
export const testTask = (service: () => ServiceBase) => {
  const fixtureData: TaskCreateData = {
    name: 'My unique task 123',
    finished: false,
  }

  let fixtureRes: TaskBase

  beforeAll(async () => {
    fixtureRes = await service().task.createOne({ data: fixtureData })
  })

  test('task createOne', async () => {
    expect(fixtureRes).toMatchObject(fixtureData)
  })

  test('task findOne', async () => {
    expect(fixtureRes).toMatchObject(fixtureData)

    const res = await service()?.task.findOne({
      where: { id: fixtureRes.id },
    })

    expect(res).toMatchObject(fixtureRes)
  })

  test('task findMany > name filter ok', async () => {
    const res = await service().task.findMany({ where: { name: fixtureData.name } })

    expect(res[0]).toMatchObject(fixtureData)
    expect(res.length).toBe(1)
  })

  test('task findMany > name filter fail', async () => {
    const res = await service().task.findMany({
      where: { name: 'assdjh34489u3@#$%^&' },
    })

    expect(res.length).toBe(0)
  })
}
