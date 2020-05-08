import { ServiceBase } from '@todo/lib-db'
import { Client } from 'faunadb'

import { TaskService } from './task/task.service'

export class Service implements ServiceBase {
  constructor(public client: Client) {}

  readonly task = new TaskService(this.client)
}
