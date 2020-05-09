import { Database } from '@marcj/marshal-mongo'
import { ServiceBase } from '@todo/lib-db'

import { TaskService } from './task/task.service'

export class Service implements ServiceBase {
  constructor(public database: Database) {}

  readonly task = new TaskService(this.database)
}
