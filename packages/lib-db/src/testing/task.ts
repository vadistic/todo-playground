import { ServiceBase } from '../interfaces'

// eslint-disable-next-line jest/no-export
export const testTask = (service: () => ServiceBase | undefined) => {
  test('TaskService .createOne()', async () => {
    const res1 = await service()?.task.createOne({
      data: { name: 'My task' },
    })

    expect(res1).toMatchObject({
      name: 'My task',
      finished: false,
    })

    const res2 = await service()?.task.createOne({
      data: { name: 'My another task', finished: true },
    })

    expect(res2).toMatchObject({
      name: 'My another task',
      finished: true,
    })
  })
}
