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
    return (
      this.database
        .query(TaskModel)
        // .filter({ id: { $in: where.ids } })
        .find()
    )
  }

  async createOne({ data }: TaskCreateOneArgs): Promise<TaskBase> {
    const task = plainToClass(TaskModel, data)

    await this.database.add(task)

    return task
  }

  async updateOne({ where, data }: TaskUpdateOneArgs): Promise<TaskBase> {
    return data as TaskBase
  }

  async deleteOne({ where }: TaskDeleteOneArgs): Promise<TaskBase> {
    return {} as TaskBase
  }
}
