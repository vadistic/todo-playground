import { ServiceBase } from '@todo/lib-db'

import { Client } from './generated'
import { TaskService } from './task/task.service'

export class Service implements ServiceBase {
  constructor(public prisma: Client.PrismaClient) {}

  task = new TaskService(this.prisma)
}
