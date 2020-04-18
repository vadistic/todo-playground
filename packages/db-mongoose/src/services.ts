import {
  TaskFindOneArgs,
  TaskServiceBase,
  TaskFindManyArgs,
  TaskCreateOneArgs,
  TaskDeleteOneArgs,
  TaskUpdateOneArgs,
} from '@todo/shared-db'
import { Mongoose } from 'mongoose'

import type { Models } from './create-db'
import { TaskDocument } from './schema'
import { makeFilter, fixId } from './utils'

export class TaskService implements TaskServiceBase {
  constructor(public models: Models, public mongoose: Mongoose) {}

  async findOne(args: TaskFindOneArgs) {
    const res = await this.models.task.findById(args.where.id).lean()

    return fixId(res)
  }

  async findMany(args: TaskFindManyArgs) {
    const cond = makeFilter<TaskDocument>(args.where, {
      _id: { $in: args.where?.ids },
      name: { $regex: `.*${args.where?.name}.*` },
      content: { $regex: `.*${args.where?.content}.*` },
      finished: { $eq: args.where?.finished },
      createdAt: { $gte: args.where?.createdAfter, $lte: args.where?.createdBefore },
      updatedAt: { $gte: args.where?.updatedAfter, $lte: args.where?.updatedBefore },
    })

    const res = await this.models.task.find(cond).lean()

    return res.map(fixId)
  }

  async createOne(args: TaskCreateOneArgs) {
    const doc = await this.models.task.create(args.data)

    return doc.toObject()
  }

  async updateOne(args: TaskUpdateOneArgs) {
    const res = await this.models.task.findByIdAndUpdate(args.where.id, args.data).lean()

    if (!res) {
      throw Error('Cannot updateOne - Task not found')
    }

    return fixId(res)
  }

  async deleteOne(args: TaskDeleteOneArgs) {
    const res = await this.models.task.findByIdAndDelete(args.where.id).lean()

    if (!res) {
      throw Error('Cannot deleteOne - Task not found')
    }

    return fixId(res)
  }
}

export const createServices = (models: Models, mongoose: Mongoose) => ({
  task: new TaskService(models, mongoose),
})
