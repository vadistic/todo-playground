import {
  TaskFindOneArgs,
  TaskServiceBase,
  TaskFindManyArgs,
  TaskCreateOneArgs,
  TaskDeleteOneArgs,
  TaskUpdateOneArgs,
  TaskBase,
} from '@todo/lib-db'
import { Connection } from 'mongoose'

import { Models } from '../models'
import { buildFilter } from '../utils'
import { TaskDocument } from './task.schema'

export class TaskService implements TaskServiceBase {
  constructor(public ctn: Connection, public models: Models) {}

  async findOne(args: TaskFindOneArgs): Promise<TaskBase | null> {
    const doc = await this.models.task.findById(args.where.id)

    return doc?.toObject({ minimize: false })
  }

  async findMany(args: TaskFindManyArgs): Promise<TaskBase[]> {
    const cond = buildFilter<TaskDocument>(args.where, {
      _id: { $in: args.where?.ids },
      name: { $regex: `.*${args.where?.name}.*` },
      content: { $regex: `.*${args.where?.content}.*` },
      finished: { $eq: args.where?.finished },
      createdAt: { $gte: args.where?.createdAfter, $lte: args.where?.createdBefore },
      updatedAt: { $gte: args.where?.updatedAfter, $lte: args.where?.updatedBefore },
    })

    const res = await this.models.task.find(cond)

    return res.map((doc) => doc.toObject({ minimize: false }))
  }

  async createOne({ data }: TaskCreateOneArgs): Promise<TaskBase> {
    const doc = await this.models.task.create(data)

    return doc.toObject({ minimize: false })
  }

  async updateOne(args: TaskUpdateOneArgs): Promise<TaskBase> {
    const doc = await this.models.task.findByIdAndUpdate(args.where.id, args.data)

    if (!doc) {
      throw Error('Cannot updateOne - Task not found')
    }

    return doc.toObject({ minimize: false })
  }

  async deleteOne(args: TaskDeleteOneArgs): Promise<TaskBase> {
    const doc = await this.models.task.findByIdAndDelete(args.where.id)

    if (!doc) {
      throw Error('Cannot deleteOne - Task not found')
    }

    return doc.toObject({ minimize: false })
  }
}
