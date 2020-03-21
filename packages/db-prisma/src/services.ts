import { PrismaClient } from '@prisma/client'
import { TaskServiceBase, TaskFindOneArgs, TaskFindManyArgs } from 'shared-interfaces'

export class TaskService implements TaskServiceBase {
  constructor(public prisma: PrismaClient) {}

  findOne({ id }: TaskFindOneArgs) {
    return this.prisma.task.findOne({ where: { id } })
  }

  findMany({ ids }: TaskFindManyArgs) {
    return this.prisma.task.findMany({ where: { id: { in: ids } } })
  }
}

export const createServices = (prisma: PrismaClient) => ({
  task: new TaskService(prisma),
})
