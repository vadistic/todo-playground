import { PaginationArgs, ID } from '@todo/lib-db'

export type DateTime = Date

export interface TaskFindManyArgs extends PaginationArgs {
  where?: TaskWhereFilterInput
}

export interface TaskWhereFilterInput {
  id?: IDSetFilterInput
  createdAt?: DateTimeRangeFilterInput
  updatedAt?: DateTimeRangeFilterInput
  name?: StringFilterInput
  content?: StringFilterInput
  finished?: BooleanFilterInput
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IDSetFilterInput {
  in: ID[]
}

export interface DateTimeRangeFilterInput {
  before?: DateTime
  after?: DateTime
}

export interface StringFilterInput {
  eq?: string
  in?: string[]
  like?: string
}

export interface BooleanFilterInput {
  eq?: boolean
}
