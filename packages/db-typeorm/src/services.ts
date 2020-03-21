import { Connection, In } from 'typeorm'
import { TaskFindOneArgs, TaskFindManyArgs, TaskServiceBase } from '@todo/shared-interfaces'
import { TaskEntity } from './entities'

export class TaskService implements TaskServiceBase {
  constructor(public ctn: Connection, public repo = ctn.getRepository(TaskEntity)) {}

  findOne({ id }: TaskFindOneArgs) {
    return this.repo.findOne(id)
  }

  findMany({ ids }: TaskFindManyArgs) {
    return this.repo.find({ where: ids ? { id: In(ids) } : {} })
  }
}

export const createServices = (ctn: Connection) => ({
  task: new TaskService(ctn),
})
