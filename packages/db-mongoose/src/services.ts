import { TaskFindOneArgs, TaskServiceBase, TaskFindManyArgs } from '@todo/shared-db'
import { FilterQuery } from 'mongoose'
import { Models } from './create'
import { TaskDocument } from './schema'

export class TaskService implements Partial<TaskServiceBase> {
  constructor(public models: Models) {}

  async findOne(args: TaskFindOneArgs) {
    const res = await this.models.task.findOne({})

    return res
  }

  async findMany(args: TaskFindManyArgs) {
    const query = makeFilter<TaskDocument>(
      {
        _id: { $in: args.where.ids as string[] },
        name: { $regex: `.*${args.where.name}.*` },
        content: { $regex: `.*${args.where.content}.*` },
      },
      args.where,
    )

    const res = await this.models.task.find(query)

    return res
  }
}

export const createServices = (models: Models) => ({
  task: new TaskService(models),
})

// ────────────────────────────────────────────────────────────────────────────────

const filterKeys = <T>(from: T, cond: (key: string) => boolean): Partial<T> => {
  const cp = { ...from }

  for (const key of Object.keys(from)) {
    if (cond(key)) {
      delete cp[key as keyof T]
    }
  }

  return cp
}

const makeFilter = <T>(args: any, filter: FilterQuery<T>) =>
  filterKeys(filter, key => (key === '_id' ? args.ids === undefined : args[key] === undefined))
