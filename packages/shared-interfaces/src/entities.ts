import { Nullable } from './types'

export type ID = number

export interface TaskEntityBase {
  id: ID

  name: string

  content?: Nullable<string>
}
