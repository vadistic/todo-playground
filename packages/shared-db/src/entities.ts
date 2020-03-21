import { Nullable } from './types'

export type ID = number
export type DateTime = Date

export interface TaskEntityBase {
  id: ID

  createdAt: DateTime

  updatedAt: DateTime

  name: string

  content?: Nullable<string>

  finished: boolean
}
