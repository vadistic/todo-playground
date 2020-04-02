import { ConnectionOptions, Connection, createConnection, Repository } from 'typeorm'
import { DbBase } from '@todo/shared-db'
import { TaskEntity } from './schema'
import { Services } from './services'
import { config } from './config'

export interface Repositories {
  task: Repository<TaskEntity>
}

export interface TypeormDb extends DbBase {
  ctn: Connection
  repo: Repositories
  service: Services
}

export const createDb = async (): Promise<TypeormDb> => {
  const connectionOptions: ConnectionOptions = {
    type: 'sqlite',
    database: config.get('db_file'),
    entities: [TaskEntity],
    logging: config.get('debug') ? 'all' : ['error'],
    synchronize: true,
  }

  const ctn = await createConnection(connectionOptions)
  const service = new Services(ctn)

  const repo = {
    task: ctn.getRepository(TaskEntity),
  }

  const close = async () => {
    await ctn.close()
  }

  return {
    ctn,
    service,
    repo,
    close,
  }
}
