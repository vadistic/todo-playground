import { Expr } from 'faunadb'

export interface FaunaResponse<T> {
  ref: Expr & { id: string }
  ts: number
  data: T
}

export const serialise = <T>(res: FaunaResponse<T>): T => ({ id: res.ref.id, ...res.data })
