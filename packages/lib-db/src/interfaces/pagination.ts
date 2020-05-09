import { ID } from './base'

export type SortDirection = 'ASC' | 'DESC'

export interface PaginationArgs {
  limit?: number
  after?: ID
  before?: ID
  order?: SortDirection
}
