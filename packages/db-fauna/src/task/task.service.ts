/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import {
  TaskServiceBase,
  TaskCreateOneArgs,
  TaskFindOneArgs,
  TaskFindManyArgs,
  TaskUpdateOneArgs,
  TaskDeleteOneArgs,
  TaskBase,
} from '@todo/lib-db'
import { Client, query as q, Expr, errors } from 'faunadb'

import { Collection } from '../collections'
import { FaunaResponse, serialise } from '../utils'

export class TaskService implements TaskServiceBase {
  constructor(readonly client: Client) {}

  async findOne({ where }: TaskFindOneArgs): Promise<TaskBase | null> {
    try {
      const res = await this.client.query<FaunaResponse<TaskBase>>(
        q.Get(q.Ref(Collection.Task, where.id)),
      )

      return serialise(res)
    } catch (err) {
      if (err instanceof errors.NotFound) {
        return null
      }
      throw err
    }
  }

  async findMany(args: TaskFindManyArgs) {
    return []
  }

  async createOne({ data }: TaskCreateOneArgs) {
    const ts = new Date().toISOString()

    const task = {
      ...data,
      createdAt: ts,
      updatedAt: ts,
      finished: data.finished ?? false,
    }

    const res = await this.client.query<FaunaResponse<TaskBase>>(
      q.Create(Collection.Task, { data: task }),
    )

    return serialise(res)
  }

  async updateOne({ where, data }: TaskUpdateOneArgs) {
    return data as TaskBase
  }

  async deleteOne({ where }: TaskDeleteOneArgs) {
    return {} as TaskBase
  }
}
