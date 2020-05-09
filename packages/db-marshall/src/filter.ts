import { Query, FilterQuery } from '@marcj/marshal-mongo'

export type FilterArgs<T> = { [P in keyof T]?: any }
export type Filter<T> = { [P in keyof T]?: T[P] | Query<T[P]> }

export const buildFilter = <T>(args: FilterArgs<T>, filter: Filter<T>): FilterQuery<T> => {
  const res: Filter<T> = {}

  for (const key of Object.keys(args)) {
    if (args[key as keyof T] !== undefined && filter[key as keyof T] !== undefined) {
      if (args[key as keyof T] === null) {
        res[key as keyof T] = { $exists: false }
      } else {
        res[key as keyof T] = filter[key as keyof T]
      }
    }
  }

  return res
}
