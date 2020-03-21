import { Nullable, Promisable } from './types'
import { TaskEntityBase, ID, DateTime } from './entities'

export type OrderDirection = 'ASC' | 'DESC'

export interface OrderDirectionArgs {
  order: OrderDirection
}

export interface PaginationArgs {
  limit?: Nullable<number>
  after?: Nullable<ID>
  before?: Nullable<ID>
}

export interface TaskFindOneArgs {
  id: ID
}

export interface TaskFindManyFilters extends PaginationArgs {
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

export type TaskFindManyArgs = TaskFindManyFilters & PaginationArgs & OrderDirectionArgs

export interface TaskServiceBase {
  findOne(args: TaskFindOneArgs): Promisable<Nullable<TaskEntityBase>>

  findMany(args: TaskFindManyArgs): Promisable<TaskEntityBase[]>
}
