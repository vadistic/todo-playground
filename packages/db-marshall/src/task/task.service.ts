/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import { plainToClass } from '@marcj/marshal'
import { Database } from '@marcj/marshal-mongo'
import {
  TaskServiceBase,
  TaskCreateOneArgs,
  TaskFindOneArgs,
  TaskFindManyArgs,
  TaskUpdateOneArgs,
  TaskDeleteOneArgs,
  TaskBase,
} from '@todo/lib-db'

import { buildFilter } from '../filter'
import { TaskModel } from './task.model'

export class TaskService implements TaskServiceBase {
  constructor(readonly database: Database) {}

  async findOne({ where }: TaskFindOneArgs): Promise<TaskBase | null> {
    return this.database
      .query(TaskModel)
      .filter({ id: where.id })
      .findOneOrUndefined()
      .then((task) => task ?? null)
  }

  async findMany({ where = {} }: TaskFindManyArgs): Promise<TaskBase[]> {
    return this.database
      .query(TaskModel)
      .filter(
        buildFilter<TaskModel>(
          {
            ...where,
            id: where.ids,
            createdAt: where.createdAfter || where.createdBefore,
            updatedAt: where.updatedAfter || where.updatedBefore,
          },
          {
            id: { $in: where.ids },
            createdAt: { $gte: where.createdAfter, $lte: where.createdBefore },
            updatedAt: { $gte: where.updatedAfter, $lte: where.updatedBefore },
            name: { $regex: where.name },
            content: { $regex: where.content! },
            finished: { $eq: where.finished },
          },
        ),
      )
      .find()
  }

  async createOne({ data }: TaskCreateOneArgs): Promise<TaskBase> {
    const next = plainToClass(TaskModel, data)

    await this.database.add(next)

    return next
  }

  async updateOne({ where, data }: TaskUpdateOneArgs): Promise<TaskBase> {
    const prev = await this.database
      .query(TaskModel)
      .filter({ id: { $eq: where.id } })
      .findOne()

    const next = plainToClass(TaskModel, { ...prev, data })

    await this.database.update(next)

    return next
  }

  async deleteOne({ where }: TaskDeleteOneArgs): Promise<TaskBase> {
    const prev = await this.database
      .query(TaskModel)
      .filter({ id: { $eq: where.id } })
      .findOne()

    await this.database.remove(prev)

    return prev
  }
}
