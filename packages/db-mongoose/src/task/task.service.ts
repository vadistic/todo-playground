import {
  TaskFindOneArgs,
  TaskServiceBase,
  TaskFindManyArgs,
  TaskCreateOneArgs,
  TaskDeleteOneArgs,
  TaskUpdateOneArgs,
} from '@todo/lib-db'
import { Connection } from 'mongoose'

import { Models } from '../models'
import { fixId, makeFilter } from '../utils'
import { TaskDocument } from './task.schema'

export class TaskService implements TaskServiceBase {
  constructor(public ctn: Connection, public models: Models) {}

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
