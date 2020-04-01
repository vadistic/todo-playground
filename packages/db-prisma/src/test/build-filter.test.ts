import * as Shared from '@todo/shared-db'
import * as Client from '../generated/client'

import { buildFilter, range } from '../utils'

describe('db-prisma > buildFilter', () => {
  const filter = buildFilter<Shared.TaskWhereFilters, Client.TaskWhereInput>((where) => ({
    id: { $keys: ['ids'], $value: { in: where.ids } },
    name: { contains: where.name },
    content: { contains: where.content },
    finished: { equals: where.finished },
    createdAt: {
      $keys: ['createdAfter', 'createdBefore'],
      $value: range({ from: where.createdAfter, to: where.createdBefore }),
    },
    updatedAt: {
      $keys: ['updatedAfter', 'updatedBefore'],
      $value: range({ from: where.updatedAfter, to: where.updatedBefore }),
    },
  }))

  test('string filter ok', () => {
    const args = filter({ name: 'asd' })
    expect(args).toEqual({ name: { contains: 'asd' } })
  })

  test('string filter undef', () => {
    const args = filter({ name: undefined })
    expect(args).toEqual({})
  })

  test('string filter null', () => {
    const args = filter({ content: null })
    expect(args).toEqual({ content: { equals: null } })
  })

  test('mapped key name', () => {
    const args = filter({ ids: ['asd'] })

    expect(args).toEqual({ id: { in: ['asd'] } })
  })

  test('multiple mapped names & range', () => {
    const date1 = new Date(10000)
    const date2 = new Date(20000)

    const args1 = filter({ createdBefore: date2, createdAfter: date1 })
    expect(args1).toEqual({ createdAt: { lte: date2, gte: date1 } })

    const args2 = filter({ createdAfter: date1 })
    expect(args2).toEqual({ createdAt: { gte: date1 } })

    const args3 = filter({ createdBefore: date2 })
    expect(args3).toEqual({ createdAt: { lte: date2 } })
  })

  test('undef args', () => {
    const args = filter(undefined)

    expect(args).toEqual({})
  })
})
