import { DbBase, seedAll } from '@todo/lib-db'
import { ConnectionOptions, Connection, createConnection, Repository } from 'typeorm'

import { config } from './config'
import { Service, createService } from './service'
import { TaskEntity } from './task'

export const entities = [TaskEntity]

export interface Repositories {
  task: Repository<TaskEntity>
}

export const createRepositories = (ctn: Connection) => ({
  task: ctn.getRepository(TaskEntity),
})

// ────────────────────────────────────────────────────────────────────────────────

export interface TypeormDb extends DbBase {
  ctn: Connection
  repo: Repositories
  service: Service
}

export const createDb = async (): Promise<TypeormDb> => {
  const connectionOptions: ConnectionOptions = {
    type: 'sqlite',
    database: config.get('db_file'),
    entities,
    logging: config.get('debug') ? 'all' : ['error'],
    synchronize: true,
  }

  const ctn = await createConnection(connectionOptions)
  const service = createService(ctn)

  const repo = createRepositories(ctn)

  const connect = async () => {
    await ctn.connect()
  }

  const close = async () => {
    await ctn.close()
  }

  const seed = async () => {
    await seedAll(service)
  }

  const drop = async () => {
    await ctn.dropDatabase()
  }

  const sync = async () => {
    await ctn.synchronize(true)
  }

  const isConnected = () => {
    return ctn.isConnected
  }

  return {
    ctn,
    service,
    repo,
    connect,
    close,
    seed,
    drop,
    sync,
    isConnected,
  }
}
