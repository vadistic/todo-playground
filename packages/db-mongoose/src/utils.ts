import { FilterQuery } from 'mongoose'

// ────────────────────────────────────────────────────────────────────────────────

export const filterKeys = <T>(from: T, cond: (key: string) => boolean): Partial<T> => {
  const cp = { ...from }

  for (const key of Object.keys(from)) {
    if (cond(key)) {
      delete cp[key as keyof T]
    }
  }

  return cp
}

export const buildFilter = <T>(args: any, filter: FilterQuery<T>) =>
  filterKeys(filter, (key) => (key === '_id' ? args.ids === undefined : args[key] === undefined))
