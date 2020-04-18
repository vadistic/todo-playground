import { DateTime, ID } from './base'
import { PaginationArgs } from './pagination'

export interface TaskBase {
  id: ID
  createdAt: DateTime
  updatedAt: DateTime
  name: string
  content?: string | null
  finished: boolean
}

export const taskDefaults = {
  finished: false,
}

export type TaskCreateData = {
  name: string
  content?: string | null
  finished?: boolean
}

export type TaskUpdateData = {
  name?: string
  content?: string | null
  finished?: boolean
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
  content?: string | null
  finished?: boolean
}

export interface TaskFindOneArgs {
  where: TaskWhereUnique
}

export interface TaskFindManyArgs extends PaginationArgs {
  where?: TaskWhereFilters
}

export interface TaskCreateOneArgs {
  data: TaskCreateData
}

export interface TaskUpdateOneArgs {
  where: TaskWhereUnique
  data: TaskUpdateData
}

export interface TaskDeleteOneArgs {
  where: TaskWhereUnique
}

export interface TaskServiceBase {
  findOne(args: TaskFindOneArgs): PromiseLike<TaskBase | null>

  findMany(args: TaskFindManyArgs): PromiseLike<TaskBase[]>

  createOne(args: TaskCreateOneArgs): PromiseLike<TaskBase>

  updateOne(args: TaskUpdateOneArgs): PromiseLike<TaskBase>

  deleteOne(args: TaskDeleteOneArgs): PromiseLike<TaskBase>
}
