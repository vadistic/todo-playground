import { Connection, In, Like, LessThan, MoreThan, FindOperator, Between } from 'typeorm'
import { TaskFindOneArgs, TaskFindManyArgs, TaskServiceBase, Nullable } from '@todo/shared-db'
import { buildPaginator } from 'typeorm-cursor-pagination'

import { TaskEntity } from './entities'

const MAX_RESULTS = 100

export class TaskService implements TaskServiceBase {
  constructor(public ctn: Connection, public repo = ctn.getRepository(TaskEntity)) {}

  async findOne({ id }: TaskFindOneArgs) {
    return this.repo.findOne(id)
  }

  async findMany(args: TaskFindManyArgs) {
    const qb = this.repo.createQueryBuilder().where({
      id: cond(In, args.ids),
      finished: args.finished,
      name: cond(Like, args.name),
      content: cond(Like, args.content),
      createdAt: range(args.createdAfter, args.createdBefore),
      updatedAt: range(args.updatedAfter, args.updatedBefore),
    })

    if (args.limit && args.limit > MAX_RESULTS) {
      throw Error(`Exceeded service result limit. MAX_RESULTS = ${MAX_RESULTS}`)
    }

    if (!args.after && !args.before) {
      return qb.execute()
    }

    const paginator = buildPaginator({
      entity: TaskEntity,
      query: {
        limit: args.limit = 20,
        order: 'DESC',
        beforeCursor: args.before ? '' + args.before : undefined,
        afterCursor: args.after ? '' + args.after : undefined,
      },
    })

    const { data, cursor } = await paginator.paginate(qb)

    return data
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
