import { ServiceBase } from '@todo/lib-db'
import { Connection } from 'mongoose'

import { Models } from './models'
import { TaskService } from './task/task.service'

export class Service implements ServiceBase {
  task = new TaskService(this.ctn, this.models)

  constructor(readonly ctn: Connection, readonly models: Models) {}
}

export const createService = (ctn: Connection, models: Models) => new Service(ctn, models)
