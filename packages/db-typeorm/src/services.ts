import { Connection, SelectQueryBuilder } from 'typeorm'
import {
  TaskFindOneArgs,
  TaskFindManyArgs,
  TaskServiceBase,
  TaskCreateOneArgs,
  TaskUpdateOneArgs,
  TaskDeleteOneArgs,
  TaskBase,
} from '@todo/shared-db'
import { buildPaginator } from 'typeorm-cursor-pagination'

import { TaskEntity } from './schema'

const DEFAULT_LIMIT = 20

export class TaskService implements TaskServiceBase {
  constructor(public ctn: Connection, public repo = ctn.getRepository(TaskEntity)) {}

  async findOne(args: TaskFindOneArgs) {
    const res = await this.repo.findOne(args.where.id)
    return res ?? null
  }

  async findMany(args: TaskFindManyArgs) {
    const qb = this.repo.createQueryBuilder('task').select('task.*')

    // TODO: this really should be generalised
    const filter = (qb: SelectQueryBuilder<TaskEntity>) => {
      const {
        ids,
        name,
        content,
        finished,
        createdBefore,
        createdAfter,
        updatedBefore,
        updatedAfter,
      } = args.where

      const skip = '1=1'

      type Defined<T> = T extends undefined ? never : T
      const def = <T>(val: T): val is Defined<T> => val !== undefined

      qb.andWhere(def(ids) ? 'task.id IN (...:ids)' : skip, { ids })
        .andWhere(def(name) ? 'task.name LIKE :name' : skip, { name: `%${name}%` })
        .andWhere(def(content) ? 'task.content LIKE :content' : skip, {
          content: `%${content}%`,
        })
        .andWhere(def(finished) ? 'task.finished = :finished' : skip, { finished })
        .andWhere(
          def(createdBefore) && def(createdAfter)
            ? 'task.createdAt BETWEEN :createdBefore AND :createdAfter'
            : def(createdBefore)
            ? 'task.createdAt <= :createdBefore'
            : def(createdAfter)
            ? 'task.createdAt >= :createdAfter'
            : skip,
          { createdBefore, createdAfter },
        )
        .andWhere(
          def(updatedBefore) && def(updatedAfter)
            ? 'task.updatedAt BETWEEN :updatedBefore AND :updatedAfter'
            : def(updatedBefore)
            ? 'task.updatedAt <= :updatedBefore'
            : def(updatedAfter)
            ? 'task.updatedAt >= :updatedAfter'
            : skip,
          { updatedBefore, updatedAfter },
        )

      return qb
    }

    // sqlite does not support booleans AND typeorm qb does not support transforms
    const tranformResult = (arr: TaskBase[]): TaskBase[] =>
      arr.map((res) => ({
        ...res,
        finished: !!res.finished,
      }))

    if (!args.after && !args.before) {
      return tranformResult(await filter(qb).execute())
    }

    const paginator = buildPaginator({
      entity: TaskEntity,
      query: {
        limit: args.limit ?? DEFAULT_LIMIT,
        order: 'DESC',
        beforeCursor: args.before ? '' + args.before : undefined,
        afterCursor: args.after ? '' + args.after : undefined,
      },
    })

    const { data } = await paginator.paginate(filter(qb))

    return tranformResult(data)
  }

  async createOne(args: TaskCreateOneArgs) {
    return this.repo.create(args.data).save({ reload: true })
  }

  async updateOne(args: TaskUpdateOneArgs) {
    return this.repo.create({ ...args.data, id: args.where.id }).save({ reload: true })
  }

  async deleteOne(args: TaskDeleteOneArgs) {
    const res = await this.repo.findOneOrFail(args.where.id)
    const cp = { ...res }

    await this.repo.remove(res)

    return cp
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export class Services {
  constructor(public ctn: Connection) {}

  public task = new TaskService(this.ctn)
}
