import { ID } from './base'

export type OrderDirection = 'ASC' | 'DESC'

export interface PaginationArgs {
  limit?: number
  after?: ID
  before?: ID
  order?: OrderDirection
}
