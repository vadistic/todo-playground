import { TaskBase, DbBase, BaseColumnNames } from '../interfaces'

// eslint-disable-next-line jest/no-export
export const runBasicTaskTests = (getDb: () => DbBase) => {
  const pluckSysFields = <T>(val: T): Omit<T, BaseColumnNames> => {
    const cp: any = { ...val }

    if ('id' in cp) delete cp.id
    if ('createdAt' in cp) delete cp.createdAt
    if ('updatedAt' in cp) delete cp.updatedAt

    return cp
  }

  let fixture: TaskBase = {
    id: 'aaa-123',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'My unique task 123',
    content: null,
    finished: false,
  }

  beforeAll(async () => {
    const res = await getDb().service.task.createOne({ data: pluckSysFields(fixture) })

    fixture = res
  })

  it('createOne & findOne', async () => {
    const res = await getDb().service.task.findOne({
      where: { id: fixture.id },
    })

    expect(res).toMatchObject(pluckSysFields(fixture))
  })

  it('findMany > name filter ok', async () => {
    const [res] = await getDb().service.task.findMany({ where: { name: 'My' } })
    expect(res).toMatchObject(pluckSysFields(fixture))
  })

  it('findMany > name filter fail', async () => {
    const res = await getDb().service.task.findMany({
      where: { name: 'assdjh34489u3@#$%^&' },
    })

    expect(res.length).toBe(0)
  })

  it('updateOne', async () => {
    const updateData = { name: 'My renamed task', finished: true }

    const res1 = await getDb().service.task.updateOne({
      where: { id: fixture.id },
      data: updateData,
    })

    const res2 = await getDb().service.task.findOne({ where: { id: fixture.id } })

    const fix = {
      ...pluckSysFields(fixture),
      ...updateData,
    }

    // from update
    expect(res1).toMatchObject(fix)
    // from find
    expect(res2).toMatchObject(fix)
  })

  it('deleteOne > returns deleted record', async () => {
    const res = await getDb().service.task.deleteOne({
      where: { id: fixture.id },
    })

    expect(res.id).toBe(fixture.id)
  })

  it('deleteOne > really deletes record', async () => {
    const res = await getDb().service.task.findOne({ where: { id: fixture.id } })

    expect(res).toBe(null)
  })
}
