import { Connection } from 'typeorm'

import { TaskService } from './task/task.service'

export class Service {
  constructor(public ctn: Connection) {}

  task = new TaskService(this.ctn)
}

export const createService = (ctn: Connection) => new Service(ctn)
