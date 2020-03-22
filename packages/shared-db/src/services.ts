import { Nullable, Promisable } from './types'
import { TaskEntityBase, ID, DateTime } from './entities'

export type OrderDirection = 'ASC' | 'DESC'

export type SystemColumnNames = 'id' | 'createdAt' | 'updatedAt'

export interface PaginationArgs {
  limit?: Nullable<number>
  after?: Nullable<ID>
  before?: Nullable<ID>
  order?: OrderDirection
}

export interface TaskWhereUnique {
  id: ID
}

export interface TaskWhereFilters {
  ids?: Nullable<ID[]>

  // time filters
  updatedBefore?: DateTime
  updatedAfter?: DateTime
  createdBefore?: DateTime
  createdAfter?: DateTime

  // search filters
  name?: Nullable<string>
  content?: Nullable<string>
  finished?: Nullable<boolean>
}

export interface TaskFindOneArgs {
  where: TaskWhereUnique
}

export interface TaskFindManyArgs extends PaginationArgs {
  where: TaskWhereFilters
}

export interface TaskCreateOneArgs {
  data: Omit<TaskEntityBase, SystemColumnNames>
}

export interface TaskUpdateOneArgs {
  where: TaskWhereUnique
  data: Partial<Omit<TaskEntityBase, SystemColumnNames>>
}

export interface TaskDeleteOneArgs {
  where: TaskWhereUnique
}

export interface TaskServiceBase {
  findOne(args: TaskFindOneArgs): Promisable<Nullable<TaskEntityBase>>

  findMany(args: TaskFindManyArgs): Promisable<TaskEntityBase[]>

  createOne(args: TaskCreateOneArgs): Promisable<TaskEntityBase>

  updateOne(args: TaskUpdateOneArgs): Promisable<TaskEntityBase>

  deleteOne(args: TaskDeleteOneArgs): Promisable<TaskEntityBase>
}

export interface ServicesBase {
  task: TaskServiceBase
}

export interface DbBase {
  services: ServicesBase
}
