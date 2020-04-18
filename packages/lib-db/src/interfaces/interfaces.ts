import { TaskServiceBase } from './task'

export interface ServiceBase {
  task: TaskServiceBase
}

export interface DbBase {
  service: ServiceBase
  isConnected(): boolean
  connect(): Promise<void>
  close(): Promise<void>
  seed(): Promise<void>
  sync(): Promise<void>
  drop(): Promise<void>
}

export type CreateDbFn<DB = DbBase> = () => Promise<DB>
