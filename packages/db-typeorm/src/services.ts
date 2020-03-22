import { Connection, In, Like, LessThan, MoreThan, FindOperator, Between } from 'typeorm'
import {
  TaskFindOneArgs,
  TaskFindManyArgs,
  TaskServiceBase,
  Nullable,
  TaskCreateOneArgs,
  TaskUpdateOneArgs,
  TaskDeleteOneArgs,
} from '@todo/shared-db'
import { buildPaginator } from 'typeorm-cursor-pagination'

import { TaskEntity } from './entities'

const RESULTS_MAX = 100
const RESULTS_DEFUALT = 20

export class TaskService implements TaskServiceBase {
  constructor(public ctn: Connection, public repo = ctn.getRepository(TaskEntity)) {}

  async findOne(args: TaskFindOneArgs) {
    return this.repo.findOne(args.where.id)
  }

  async findMany(args: TaskFindManyArgs) {
    const qb = this.repo.createQueryBuilder().where({
      id: cond(In, args.where.ids),
      finished: args.where.finished,
      name: cond(Like, args.where.name),
      content: cond(Like, args.where.content),
      createdAt: range(args.where.createdAfter, args.where.createdBefore),
      updatedAt: range(args.where.updatedAfter, args.where.updatedBefore),
    })

    if (args.limit && args.limit > RESULTS_MAX) {
      throw Error(`Exceeded service result limit. RESULTS_MAX = ${RESULTS_MAX}`)
    }

    if (!args.after && !args.before) {
      return qb.execute()
    }

    const paginator = buildPaginator({
      entity: TaskEntity,
      query: {
        limit: args.limit ?? RESULTS_DEFUALT,
        order: 'DESC',
        beforeCursor: args.before ? '' + args.before : undefined,
        afterCursor: args.after ? '' + args.after : undefined,
      },
    })

    const { data } = await paginator.paginate(qb)

    return data
  }

  async createOne(args: TaskCreateOneArgs) {
    return this.repo.create(args.data).save({ reload: true })
  }

  async updateOne(args: TaskUpdateOneArgs) {
    return this.repo.create({ ...args.data, id: args.where.id }).save({ reload: true })
  }

  async deleteOne(args: TaskDeleteOneArgs) {
    return this.repo.remove(this.repo.create({ id: args.where.id }))
  }
}

// ────────────────────────────────────────────────────────────────────────────────

type FindFn<T> = (val: T) => FindOperator<T>

const cond = <T>(op: FindFn<T>, val: Nullable<T>) => {
  if (val === null || val === undefined) return

  return op(val)
}

const range = <T>(from: Nullable<T>, to: Nullable<T>) =>
  to && from ? Between(to, from) : to ? LessThan(to) : cond(MoreThan, from)

// ────────────────────────────────────────────────────────────────────────────────

export const createServices = (ctn: Connection) => ({
  task: new TaskService(ctn),
})
