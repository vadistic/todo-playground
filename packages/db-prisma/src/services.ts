import { PrismaClient } from '@prisma/client'
import { TaskServiceBase, TaskFindOneArgs, TaskFindManyArgs, Nullable } from '@todo/shared-db'

const MAX_RESULTS = 100

export class TaskService implements TaskServiceBase {
  constructor(public prisma: PrismaClient) {}

  async findOne({ id }: TaskFindOneArgs) {
    return this.prisma.task.findOne({ where: { id } })
  }

  findMany(args: TaskFindManyArgs) {
    if (args.limit && args.limit > MAX_RESULTS) {
      throw Error(`Exceeded service result limit. MAX_RESULTS = ${MAX_RESULTS}`)
    }

    return this.prisma.task.findMany({
      where: { id: ifDefined(args.ids, { in: args.ids }) },
      after: ifDefined(args.after, { id: args.after }),
      before: ifDefined(args.before, { id: args.before }),
      first: ifDefined(args.limit, args.limit) ?? 0,
    })
  }
}

// ────────────────────────────────────────────────────────────────────────────────

const ifDefined = <T>(cond: any, val: Nullable<T>) => {
  if (val === null || cond === undefined) return

  return val
}

// ────────────────────────────────────────────────────────────────────────────────

export const createServices = (prisma: PrismaClient) => ({
  task: new TaskService(prisma),
})
