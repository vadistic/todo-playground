import { ServiceBase } from '@todo/lib-db'

import { Client } from './generated'
import { TaskService } from './task'

export class Service implements ServiceBase {
  constructor(public prisma: Client.PrismaClient) {}

  task = new TaskService(this.prisma)
}
