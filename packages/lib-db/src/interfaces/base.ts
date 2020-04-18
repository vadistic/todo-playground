export type ID = string
export type DateTime = Date

export type BaseColumnNames = 'id' | 'createdAt' | 'updatedAt'

export interface Base {
  id: ID

  createdAt: DateTime

  updatedAt: DateTime
}
