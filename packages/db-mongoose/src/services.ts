import { TaskFindOneArgs, TaskServiceBase, TaskFindManyArgs } from '@todo/shared-db'
import { Models } from './create'
import { TaskDocument } from './schema'
import { makeFilter } from './utils'

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
