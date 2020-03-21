import { Nullable, Promisable } from './types'
import { TaskEntityBase, ID } from './entities'

export interface TaskFindOneArgs {
  id: ID
}

export interface TaskFindManyArgs {
  ids?: Nullable<ID[]>
}

export interface TaskServiceBase {
  findOne(args: TaskFindOneArgs): Promisable<TaskEntityBase>

  findMany(args: TaskFindManyArgs): Promisable<TaskEntityBase>
}
