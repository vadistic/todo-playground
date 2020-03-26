import { PrismaClient } from '@prisma/client'
import {
  TaskServiceBase,
  TaskFindOneArgs,
  TaskFindManyArgs,
  Nullable,
  TaskCreateOneArgs,
  TaskUpdateOneArgs,
  TaskDeleteOneArgs,
  ServicesBase,
} from '@todo/shared-db'

const RESULTS_MAX = 100
const RESULTS_DEFUALT = 20

export class TaskService implements TaskServiceBase {
  constructor(public prisma: PrismaClient) {}

  async findOne(args: TaskFindOneArgs) {
    return this.prisma.task.findOne({ where: { id: args.where.id } })
  }

  async findMany(args: TaskFindManyArgs) {
    if (args.limit && args.limit > RESULTS_MAX) {
      throw Error(`Exceeded service result limit. RESULTS_MAX = ${RESULTS_MAX}`)
    }

    // TODO: make so mapped fn for those tetrary ops
    // TODO: date range fn
    return this.prisma.task.findMany({
      where: {
        id: args.where.ids ? { in: args.where.ids } : undefined,
        name: args.where.name ? { contains: args.where.name } : undefined,
        content: args.where.content ? { contains: args.where.content } : undefined,
        finished: args.where.finished ? { equals: args.where.finished } : undefined,
      },
      after: ifDefined(args.after, { id: args.after }),
      before: ifDefined(args.before, { id: args.before }),
      first: ifDefined(args.limit, args.limit) ?? RESULTS_DEFUALT,
    })
  }

  async createOne(args: TaskCreateOneArgs) {
    return this.prisma.task.create({ data: args.data })
  }

  async updateOne(args: TaskUpdateOneArgs) {
    return this.prisma.task.update({ where: { id: args.where.id }, data: args.data })
  }

  async deleteOne(args: TaskDeleteOneArgs) {
    return this.prisma.task.delete({ where: { id: args.where.id } })
  }
}

// ────────────────────────────────────────────────────────────────────────────────

const ifDefined = <T>(cond: any, val: Nullable<T>) => {
  if (val === null || cond === undefined) return

  return val
}

// ────────────────────────────────────────────────────────────────────────────────

export class Services implements ServicesBase {
  constructor(public prisma: PrismaClient) {}

  public task = new TaskService(this.prisma)
}
