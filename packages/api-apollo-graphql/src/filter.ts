import { TaskWhereFilters } from '@todo/lib-db'

import { TaskWhereFilterInput } from './types'

export const resolveFilter = (filter: TaskWhereFilterInput): TaskWhereFilters => {
  const res: any = {}

  if (!filter) return res

  for (const key of Object.keys(filter)) {
    const prop = (filter as any)[key]

    if (prop && typeof prop === 'object') {
      if (prop.eq !== undefined) {
        res[key] = prop.eq
      }

      if (prop.in !== undefined) {
        res[key] = prop.in
      }

      if (prop.like !== undefined) {
        res[key] = prop.like
      }

      if (prop.after) {
        if (key === 'createdAt') {
          res.createdAfter = prop.after
        }

        if (key === 'updatedAt') {
          res.updatedAfter = prop.after
        }
      }

      if (prop.before) {
        if (key === 'createdAt') {
          res.createdBefore = prop.before
        }

        if (key === 'updatedAt') {
          res.updatedBefore = prop.before
        }
      }
    }
  }

  return res
}
