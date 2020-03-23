import { Nullable } from './types'

export type ID = number | string
export type DateTime = Date

export type OrderDirection = 'ASC' | 'DESC'

export type SystemColumnNames = 'id' | 'createdAt' | 'updatedAt'

export interface PaginationArgs {
  limit?: number
  after?: ID
  before?: ID
  order?: OrderDirection
}

// ────────────────────────────────────────────────────────────────────────────────

export interface TaskBase {
  id: ID

  createdAt: DateTime

  updatedAt: DateTime

  name: string

  content?: Nullable<string>

  finished: boolean
}

export interface TaskWhereUnique {
  id: ID
}

export interface TaskWhereFilters {
  ids?: ID[]

  // time filters
  updatedBefore?: DateTime
  updatedAfter?: DateTime
  createdBefore?: DateTime
  createdAfter?: DateTime

  // search filters
  name?: string
  content?: Nullable<string>
  finished?: boolean
}

export interface TaskFindOneArgs {
  where: TaskWhereUnique
}

export interface TaskFindManyArgs extends PaginationArgs {
  where: TaskWhereFilters
}

export interface TaskCreateOneArgs {
  data: Omit<TaskBase, SystemColumnNames>
}

export interface TaskUpdateOneArgs {
  where: TaskWhereUnique
  data: Partial<Omit<TaskBase, SystemColumnNames>>
}

export interface TaskDeleteOneArgs {
  where: TaskWhereUnique
}

export interface TaskServiceBase {
  findOne(args: TaskFindOneArgs): PromiseLike<Nullable<TaskBase>>

  findMany(args: TaskFindManyArgs): PromiseLike<TaskBase[]>

  createOne(args: TaskCreateOneArgs): PromiseLike<TaskBase>

  updateOne(args: TaskUpdateOneArgs): PromiseLike<TaskBase>

  deleteOne(args: TaskDeleteOneArgs): PromiseLike<TaskBase>
}

// ────────────────────────────────────────────────────────────────────────────────

export interface ServicesBase {
  task: TaskServiceBase
}

export interface BackendBase {
  services: ServicesBase
}
