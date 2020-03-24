import {
  TaskFindOneArgs,
  TaskServiceBase,
  TaskFindManyArgs,
  TaskCreateOneArgs,
  TaskBase,
} from '@todo/shared-db'
import { Models } from './create'
import { TaskDocument, TaskModel } from './schema'
import { makeFilter, fixId } from './utils'

export class TaskService implements Partial<TaskServiceBase> {
  constructor(public models: Models) {}

  async findOne(args: TaskFindOneArgs) {
    const res = await this.models.task.findById(args.where.id).lean()

    return fixId(res) as TaskBase
  }

  async findMany(args: TaskFindManyArgs) {
    const cond = makeFilter<TaskDocument>(args.where, {
      _id: { $in: args.where.ids as string[] },
      name: { $regex: `.*${args.where.name}.*` },
      content: { $regex: `.*${args.where.content}.*` },
      finished: { $eq: args.where.finished },
      createdAt: { $gte: args.where.createdAfter, $lte: args.where.createdBefore },
      updatedAt: { $gte: args.where.updatedAfter, $lte: args.where.updatedBefore },
    })

    const res = await this.models.task.find(cond).lean()

    return res.map(fixId)
  }

  async createOne(args: TaskCreateOneArgs) {
    const doc = new TaskModel(args.data)

    const res = await doc.save()

    return res.toObject()
  }
}

export const createServices = (models: Models) => ({
  task: new TaskService(models),
})
